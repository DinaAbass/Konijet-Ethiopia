import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { AdminWebhookSchema } from "@/lib/validations";
import {
  updatePackageAvailability,
  updatePackagePrice,
  getPackageById,
} from "@/lib/appwrite-server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AdminWebhookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { action, packageId, isAvailable, price, discountPrice } = parsed.data;

  const pkg = await getPackageById(packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: `Package not found: ${packageId}` },
      { status: 404 }
    );
  }

  try {
    if (action === "toggle_availability") {
      await updatePackageAvailability(packageId, isAvailable!);
    } else if (action === "update_price") {
      await updatePackagePrice(packageId, price, discountPrice);
    }

    revalidatePath("/");
    revalidatePath("/explore");
    revalidatePath(`/tours/${pkg.slug}`);

    return NextResponse.json({
      success: true,
      packageName: pkg.name,
      action,
      isAvailable,
      price: price ?? pkg.price,
      discountPrice: discountPrice ?? null,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[Admin Webhook] Error:", err);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
