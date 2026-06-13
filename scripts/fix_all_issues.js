/**
 * fix_all_issues.js
 * Fixes English-language content that slipped through in privacy/terms sections
 * of: ru, zh, es, fr, nl, pl, pt, tr locale files.
 */
const fs = require('fs');
const path = require('path');

const I18N_DIR = path.join(__dirname, '../src/lib/i18n');

// ── TRANSLATIONS for the 6 problem content strings ──────────────────────────
// Key: English text prefix (first ~30 chars) -> locale -> translated value

const FIXES = {
  ru: {
    // Section 5: Data Retention
    dataRetention: `Мы храним ваши данные следующим образом:\\n\\n• Данные бронирований: 3 года с даты поездки (для бухгалтерского и юридического соответствия)\\n• Подписчики на рассылку: До момента отписки\\n• Контактные сообщения: 1 год\\n• Аналитические данные: 90 дней (анонимизированные)\\n\\nВы можете запросить удаление своих данных в любое время, написав на privacy@konijetethiopia.qzz.io.`,
    // Section 6: Your Rights
    yourRights: `В зависимости от вашего местонахождения вы имеете право:\\n\\n• ДОСТУП — Запросить копию ваших персональных данных\\n• ИСПРАВЛЕНИЕ — Исправить неточные данные, которые мы храним\\n• УДАЛЕНИЕ — Запросить удаление ваших данных («право быть забытым»)\\n• ОГРАНИЧЕНИЕ — Запросить ограничение обработки ваших данных\\n• ПЕРЕНОСИМОСТЬ — Получить ваши данные в машиночитаемом формате\\n• ВОЗРАЖЕНИЕ — Возразить против обработки на основе законных интересов\\n• ОТЗЫВ СОГЛАСИЯ — Отписаться от маркетинга в любое время\\n\\nСвяжитесь с нами по адресу privacy@konijetethiopia.qzz.io. Мы ответим в течение 30 дней.`,
    // Section 9: Children's Privacy
    childrensPrivacy: `Наши услуги не предназначены для детей до 16 лет. Мы сознательно не собираем персональные данные детей. Если вы считаете, что мы случайно собрали такие данные, пожалуйста, немедленно свяжитесь с нами по адресу privacy@konijetethiopia.qzz.io.`,
    // Section 12: Email Marketing
    emailMarketing: `Если вы подписались на нашу рассылку, вы будете получать рекламные письма о наших турах, предложениях и путешествиях. Вы можете отписаться в любое время, нажав «Отписаться» в любом письме или написав на privacy@konijetethiopia.qzz.io. Мы обрабатываем маркетинговые списки с помощью сертифицированного поставщика услуг электронной почты в соответствии с международными правилами email-маркетинга.`,
    // Section 14: Contact Us (Privacy)
    privacyContact: `По вопросам конфиденциальности, запросам данных или другим вопросам:\\n\\nKonijet Ethiopia Tourism\\nEmail: privacy@konijetethiopia.qzz.io\\nАдрес: Аддис-Абеба, Эфиопия`,
    // Section 15: Contact (Terms)
    termsContact: `По вопросам этих Условий:\\n\\nKonijet Ethiopia Tourism\\nEmail: legal@konijetethiopia.qzz.io\\nАдрес: Аддис-Абеба, Эфиопия`,
    // Section 4: Cancellations (Terms)
    cancellations: `Отмена клиентом:\\n• За 60+ дней до отъезда: полный возврат за вычетом 10% административного сбора\\n• За 30–59 дней до отъезда: возврат 50%\\n• За 14–29 дней до отъезда: возврат 25%\\n• Менее чем за 14 дней до отъезда: возврат не предусмотрен\\n• Неявка: возврат не предусмотрен\\n\\nОтмена со стороны Konijet Ethiopia:\\nЕсли мы отменяем тур по обстоятельствам, не зависящим от нас (форс-мажор, стихийное бедствие, правительственные предупреждения о поездках или недобор минимального количества участников), мы предложим полноценные альтернативные даты, полный кредит на будущие поездки или полный возврат в течение 14 рабочих дней.\\n\\nВсе отмены должны быть поданы в письменной форме на адрес: booking@konijetethiopia.qzz.io`,
  },
  zh: {
    dataRetention: `我们的数据保留方式如下：\\n\\n• 预订数据：自出行日期起3年（用于会计/法律合规）\\n• 新闻通讯订阅者：直至取消订阅\\n• 联系消息：1年\\n• 分析数据：90天（匿名化）\\n\\n您可以随时发送电子邮件至 privacy@konijetethiopia.qzz.io 申请删除您的数据。`,
    yourRights: `根据您所在的位置，您有权：\\n\\n• 访问 — 申请您个人数据的副本\\n• 更正 — 更正我们持有的不准确数据\\n• 删除 — 申请删除您的数据（"被遗忘权"）\\n• 限制 — 申请限制处理您的数据\\n• 可携带 — 以机器可读格式接收您的数据\\n• 反对 — 反对基于合法利益的处理\\n• 撤回同意 — 随时取消订阅营销\\n\\n请通过 privacy@konijetethiopia.qzz.io 联系我们，我们将在30天内回复。`,
    childrensPrivacy: `我们的服务不面向16岁以下儿童。我们不会故意收集儿童的个人数据。如果您认为我们无意中收集了此类数据，请立即通过 privacy@konijetethiopia.qzz.io 联系我们。`,
    emailMarketing: `如果您订阅了我们的通讯，您将收到有关我们旅行团、优惠和旅行内容的促销电子邮件。您可以随时通过点击任何电子邮件中的"取消订阅"或发送邮件至 privacy@konijetethiopia.qzz.io 取消订阅。我们使用经过认证的电子邮件服务提供商处理营销列表，符合国际电子邮件营销法规。`,
    privacyContact: `如有隐私问题、数据申请或其他疑问：\\n\\nKonijet Ethiopia Tourism\\n电子邮件：privacy@konijetethiopia.qzz.io\\n地址：埃塞俄比亚亚的斯亚贝巴`,
    termsContact: `如有关于这些条款的问题：\\n\\nKonijet Ethiopia Tourism\\n电子邮件：legal@konijetethiopia.qzz.io\\n地址：埃塞俄比亚亚的斯亚贝巴`,
    cancellations: `客户取消：\\n• 出发前60天以上：全额退款，扣除10%行政费\\n• 出发前30–59天：退款50%\\n• 出发前14–29天：退款25%\\n• 出发前不足14天：不予退款\\n• 未出现：不予退款\\n\\nKonijet Ethiopia取消：\\n如果我们因不可控情况（不可抗力、自然灾害、政府旅行警告或最低团体人数未达到）取消旅行团，我们将提供完整的备选日期、未来旅行的全额积分或在14个工作日内全额退款。\\n\\n所有取消申请必须以书面形式提交至：booking@konijetethiopia.qzz.io`,
  },
  es: {
    dataRetention: `Conservamos sus datos de la siguiente manera:\\n\\n• Datos de reserva: 3 años desde la fecha del viaje (para cumplimiento contable/legal)\\n• Suscriptores al boletín: Hasta que cancele la suscripción\\n• Mensajes de contacto: 1 año\\n• Datos analíticos: 90 días (anonimizados)\\n\\nPuede solicitar la eliminación de sus datos en cualquier momento enviando un correo a privacy@konijetethiopia.qzz.io.`,
    yourRights: `Dependiendo de su ubicación, tiene derecho a:\\n\\n• ACCESO — Solicitar una copia de sus datos personales\\n• RECTIFICACIÓN — Corregir datos inexactos que conservamos\\n• SUPRESIÓN — Solicitar la eliminación de sus datos ("derecho al olvido")\\n• RESTRICCIÓN — Solicitar que limitemos el procesamiento de sus datos\\n• PORTABILIDAD — Recibir sus datos en formato legible por máquina\\n• OPOSICIÓN — Oponerse al procesamiento basado en intereses legítimos\\n• RETIRAR CONSENTIMIENTO — Cancelar la suscripción de marketing en cualquier momento\\n\\nContáctenos en privacy@konijetethiopia.qzz.io. Responderemos en 30 días.`,
    childrensPrivacy: `Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos conscientemente datos personales de menores. Si cree que hemos recopilado dichos datos sin querer, contáctenos inmediatamente en privacy@konijetethiopia.qzz.io.`,
    emailMarketing: `Si se suscribió a nuestro boletín, recibirá correos promocionales sobre nuestros tours, ofertas y contenido de viajes. Puede cancelar la suscripción en cualquier momento haciendo clic en "Cancelar suscripción" en cualquier correo o enviando un email a privacy@konijetethiopia.qzz.io. Procesamos listas de marketing con un proveedor de servicios de email certificado, cumpliendo con las normativas internacionales de email marketing.`,
    privacyContact: `Para consultas de privacidad, solicitudes de datos o preguntas:\\n\\nKonijet Ethiopia Tourism\\nEmail: privacy@konijetethiopia.qzz.io\\nDirección: Addis Abeba, Etiopía`,
    termsContact: `Para preguntas sobre estos Términos:\\n\\nKonijet Ethiopia Tourism\\nEmail: legal@konijetethiopia.qzz.io\\nDirección: Addis Abeba, Etiopía`,
    cancellations: `Cancelación por parte del cliente:\\n• 60+ días antes de la salida: reembolso completo menos un 10% de tarifa administrativa\\n• 30–59 días antes de la salida: reembolso del 50%\\n• 14–29 días antes de la salida: reembolso del 25%\\n• Menos de 14 días antes de la salida: Sin reembolso\\n• No presentación: Sin reembolso\\n\\nCancelación por parte de Konijet Ethiopia:\\nSi cancelamos un tour debido a circunstancias fuera de nuestro control (fuerza mayor, desastre natural, avisos de viaje gubernamentales, o grupo mínimo no alcanzado), ofreceremos fechas alternativas completas, crédito completo para viajes futuros, o reembolso completo en 14 días hábiles.\\n\\nTodas las cancelaciones deben enviarse por escrito a: booking@konijetethiopia.qzz.io`,
  },
  fr: {
    dataRetention: `Nous conservons vos données comme suit :\\n\\n• Données de réservation : 3 ans à compter de la date de voyage (pour la conformité comptable/légale)\\n• Abonnés à la newsletter : Jusqu'à désinscription\\n• Messages de contact : 1 an\\n• Données analytiques : 90 jours (anonymisées)\\n\\nVous pouvez demander la suppression de vos données à tout moment en envoyant un email à privacy@konijetethiopia.qzz.io.`,
    yourRights: `Selon votre localisation, vous avez le droit de :\\n\\n• ACCÈS — Demander une copie de vos données personnelles\\n• RECTIFICATION — Corriger les données inexactes que nous détenons\\n• EFFACEMENT — Demander la suppression de vos données ("droit à l'oubli")\\n• LIMITATION — Demander que nous limitions le traitement de vos données\\n• PORTABILITÉ — Recevoir vos données dans un format lisible par machine\\n• OPPOSITION — Vous opposer au traitement basé sur des intérêts légitimes\\n• RETRAIT DU CONSENTEMENT — Se désabonner du marketing à tout moment\\n\\nContactez-nous à privacy@konijetethiopia.qzz.io. Nous répondrons dans les 30 jours.`,
    childrensPrivacy: `Nos services ne sont pas destinés aux enfants de moins de 16 ans. Nous ne collectons pas sciemment de données personnelles auprès des enfants. Si vous pensez que nous avons collecté par inadvertance de telles données, veuillez nous contacter immédiatement à privacy@konijetethiopia.qzz.io.`,
    emailMarketing: `Si vous vous êtes abonné à notre newsletter, vous recevrez des emails promotionnels sur nos circuits, offres et contenus de voyage. Vous pouvez vous désabonner à tout moment en cliquant sur "Se désabonner" dans tout email ou en envoyant un email à privacy@konijetethiopia.qzz.io. Nous traitons nos listes marketing avec un prestataire de services email certifié, conformément aux réglementations internationales sur l'email marketing.`,
    privacyContact: `Pour les questions de confidentialité, les demandes de données ou toute question :\\n\\nKonijet Ethiopia Tourism\\nEmail : privacy@konijetethiopia.qzz.io\\nAdresse : Addis-Abeba, Éthiopie`,
    termsContact: `Pour toute question concernant ces Conditions :\\n\\nKonijet Ethiopia Tourism\\nEmail : legal@konijetethiopia.qzz.io\\nAdresse : Addis-Abeba, Éthiopie`,
    cancellations: `Annulation par le client :\\n• 60+ jours avant le départ : remboursement intégral moins 10% de frais administratifs\\n• 30–59 jours avant le départ : remboursement de 50%\\n• 14–29 jours avant le départ : remboursement de 25%\\n• Moins de 14 jours avant le départ : aucun remboursement\\n• Non-présentation : aucun remboursement\\n\\nAnnulation par Konijet Ethiopia :\\nSi nous annulons un circuit en raison de circonstances indépendantes de notre volonté (force majeure, catastrophe naturelle, avis de voyage gouvernementaux, ou nombre minimum de participants non atteint), nous proposerons des dates alternatives complètes, un crédit complet pour un futur voyage, ou un remboursement intégral sous 14 jours ouvrables.\\n\\nToutes les annulations doivent être soumises par écrit à : booking@konijetethiopia.qzz.io`,
  },
  nl: {
    dataRetention: `Wij bewaren uw gegevens als volgt:\\n\\n• Boekingsgegevens: 3 jaar vanaf de reisdatum (voor boekhoudkundige/juridische naleving)\\n• Nieuwsbriefabonnees: Tot u zich afmeldt\\n• Contactberichten: 1 jaar\\n• Analysegegevens: 90 dagen (geanonimiseerd)\\n\\nU kunt op elk moment verzoeken om verwijdering van uw gegevens door een e-mail te sturen naar privacy@konijetethiopia.qzz.io.`,
    yourRights: `Afhankelijk van uw locatie heeft u het recht om:\\n\\n• INZAGE — Een kopie van uw persoonsgegevens op te vragen\\n• RECTIFICATIE — Onjuiste gegevens die wij bewaren te corrigeren\\n• WISSING — Verwijdering van uw gegevens te verzoeken ("recht op vergetelheid")\\n• BEPERKING — Te verzoeken dat wij de verwerking van uw gegevens beperken\\n• OVERDRAAGBAARHEID — Uw gegevens in een machineleesbaar formaat te ontvangen\\n• BEZWAAR — Bezwaar te maken tegen verwerking op basis van gerechtvaardigde belangen\\n• INTREKKING TOESTEMMING — U op elk moment af te melden voor marketing\\n\\nNeem contact met ons op via privacy@konijetethiopia.qzz.io. Wij reageren binnen 30 dagen.`,
    childrensPrivacy: `Onze diensten zijn niet gericht op kinderen onder de 16 jaar. Wij verzamelen niet bewust persoonsgegevens van kinderen. Als u denkt dat wij per ongeluk dergelijke gegevens hebben verzameld, neem dan onmiddellijk contact met ons op via privacy@konijetethiopia.qzz.io.`,
    emailMarketing: `Als u zich heeft aangemeld voor onze nieuwsbrief, ontvangt u promotionele e-mails over onze tours, aanbiedingen en reisinhoud. U kunt zich op elk moment afmelden door op "Afmelden" in een e-mail te klikken of door een e-mail te sturen naar privacy@konijetethiopia.qzz.io. Wij verwerken marketinglijsten met een gecertificeerde e-mailserviceprovider in overeenstemming met de internationale e-mailmarketingregelgeving.`,
    privacyContact: `Voor privacyvragen, gegevensverzoeken of vragen:\\n\\nKonijet Ethiopia Tourism\\nE-mail: privacy@konijetethiopia.qzz.io\\nAdres: Addis Abeba, Ethiopië`,
    termsContact: `Voor vragen over deze Voorwaarden:\\n\\nKonijet Ethiopia Tourism\\nE-mail: legal@konijetethiopia.qzz.io\\nAdres: Addis Abeba, Ethiopië`,
    cancellations: `Annulering door klant:\\n• 60+ dagen voor vertrek: volledige terugbetaling minus 10% administratiekosten\\n• 30–59 dagen voor vertrek: 50% terugbetaling\\n• 14–29 dagen voor vertrek: 25% terugbetaling\\n• Minder dan 14 dagen voor vertrek: geen terugbetaling\\n• No-show: geen terugbetaling\\n\\nAnnulering door Konijet Ethiopia:\\nAls wij een tour annuleren vanwege omstandigheden buiten onze controle (overmacht, natuurramp, reisadviezen van de overheid, of minimale groepsgrootte niet gehaald), bieden wij volledige alternatieve data, volledig tegoed voor toekomstige reizen, of volledige terugbetaling binnen 14 werkdagen.\\n\\nAlle annuleringen moeten schriftelijk worden ingediend bij: booking@konijetethiopia.qzz.io`,
  },
  pl: {
    dataRetention: `Przechowujemy Twoje dane w następujący sposób:\\n\\n• Dane rezerwacji: 3 lata od daty podróży (dla celów rachunkowości/zgodności prawnej)\\n• Subskrybenci newslettera: Do momentu rezygnacji z subskrypcji\\n• Wiadomości kontaktowe: 1 rok\\n• Dane analityczne: 90 dni (zanonimizowane)\\n\\nMożesz zażądać usunięcia swoich danych w dowolnym momencie, wysyłając wiadomość e-mail na adres privacy@konijetethiopia.qzz.io.`,
    yourRights: `W zależności od Twojej lokalizacji masz prawo do:\\n\\n• DOSTĘPU — Żądania kopii swoich danych osobowych\\n• SPROSTOWANIA — Poprawienia niedokładnych danych, które przechowujemy\\n• USUNIĘCIA — Żądania usunięcia swoich danych ("prawo do bycia zapomnianym")\\n• OGRANICZENIA — Żądania ograniczenia przetwarzania Twoich danych\\n• PRZENOSZALNOŚCI — Otrzymania danych w formacie odczytywalnym maszynowo\\n• SPRZECIWU — Sprzeciwienia się przetwarzaniu opartemu na uzasadnionych interesach\\n• WYCOFANIA ZGODY — Rezygnacji z marketingu w dowolnym momencie\\n\\nSkontaktuj się z nami pod adresem privacy@konijetethiopia.qzz.io. Odpowiemy w ciągu 30 dni.`,
    childrensPrivacy: `Nasze usługi nie są skierowane do dzieci poniżej 16 roku życia. Nie zbieramy świadomie danych osobowych od dzieci. Jeśli uważasz, że przypadkowo zebraliśmy takie dane, skontaktuj się z nami natychmiast pod adresem privacy@konijetethiopia.qzz.io.`,
    emailMarketing: `Jeśli subskrybujesz nasz newsletter, będziesz otrzymywać promocyjne wiadomości e-mail o naszych turach, ofertach i treściach podróżniczych. Możesz zrezygnować z subskrypcji w dowolnym momencie, klikając "Anuluj subskrypcję" w dowolnym e-mailu lub wysyłając wiadomość na privacy@konijetethiopia.qzz.io. Przetwarzamy listy marketingowe za pomocą certyfikowanego dostawcy usług e-mail, zgodnie z międzynarodowymi przepisami dotyczącymi e-mail marketingu.`,
    privacyContact: `W przypadku pytań dotyczących prywatności, żądań danych lub pytań:\\n\\nKonijet Ethiopia Tourism\\nEmail: privacy@konijetethiopia.qzz.io\\nAdres: Addis Abeba, Etiopia`,
    termsContact: `W przypadku pytań dotyczących niniejszych Warunków:\\n\\nKonijet Ethiopia Tourism\\nEmail: legal@konijetethiopia.qzz.io\\nAdres: Addis Abeba, Etiopia`,
    cancellations: `Anulowanie przez klienta:\\n• 60+ dni przed wyjazdem: pełny zwrot minus 10% opłaty administracyjnej\\n• 30–59 dni przed wyjazdem: zwrot 50%\\n• 14–29 dni przed wyjazdem: zwrot 25%\\n• Mniej niż 14 dni przed wyjazdem: brak zwrotu\\n• Niestawienie się: brak zwrotu\\n\\nAnulowanie przez Konijet Ethiopia:\\nJeśli anulujemy wycieczkę z powodu okoliczności poza naszą kontrolą (siła wyższa, klęska żywiołowa, rządowe ostrzeżenia podróżne lub nieosiągnięcie minimalnej liczby uczestników), zaoferujemy pełne alternatywne terminy, pełny kredyt na przyszłe podróże lub pełny zwrot w ciągu 14 dni roboczych.\\n\\nWszystkie anulowania muszą być przesłane na piśmie do: booking@konijetethiopia.qzz.io`,
  },
  pt: {
    dataRetention: `Retemos seus dados da seguinte forma:\\n\\n• Dados de reserva: 3 anos a partir da data da viagem (para conformidade contábil/legal)\\n• Assinantes do boletim informativo: Até cancelar a assinatura\\n• Mensagens de contato: 1 ano\\n• Dados analíticos: 90 dias (anonimizados)\\n\\nVocê pode solicitar a exclusão de seus dados a qualquer momento enviando um e-mail para privacy@konijetethiopia.qzz.io.`,
    yourRights: `Dependendo da sua localização, você tem o direito de:\\n\\n• ACESSO — Solicitar uma cópia dos seus dados pessoais\\n• RETIFICAÇÃO — Corrigir dados imprecisos que mantemos\\n• APAGAMENTO — Solicitar a exclusão dos seus dados ("direito ao esquecimento")\\n• RESTRIÇÃO — Solicitar que limitemos o processamento dos seus dados\\n• PORTABILIDADE — Receber seus dados em formato legível por máquina\\n• OBJEÇÃO — Opor-se ao processamento com base em interesses legítimos\\n• RETIRAR CONSENTIMENTO — Cancelar a assinatura de marketing a qualquer momento\\n\\nEntre em contato conosco em privacy@konijetethiopia.qzz.io. Responderemos em 30 dias.`,
    childrensPrivacy: `Nossos serviços não são direcionados a crianças menores de 16 anos. Não coletamos conscientemente dados pessoais de crianças. Se você acredita que coletamos inadvertidamente tais dados, por favor entre em contato conosco imediatamente em privacy@konijetethiopia.qzz.io.`,
    emailMarketing: `Se você se inscreveu em nossa newsletter, receberá e-mails promocionais sobre nossos tours, ofertas e conteúdo de viagens. Você pode cancelar a assinatura a qualquer momento clicando em "Cancelar assinatura" em qualquer e-mail ou enviando um e-mail para privacy@konijetethiopia.qzz.io. Processamos listas de marketing com um provedor de serviços de e-mail certificado, em conformidade com os regulamentos internacionais de e-mail marketing.`,
    privacyContact: `Para dúvidas sobre privacidade, solicitações de dados ou perguntas:\\n\\nKonijet Ethiopia Tourism\\nEmail: privacy@konijetethiopia.qzz.io\\nEndereço: Adis Abeba, Etiópia`,
    termsContact: `Para perguntas sobre estes Termos:\\n\\nKonijet Ethiopia Tourism\\nEmail: legal@konijetethiopia.qzz.io\\nEndereço: Adis Abeba, Etiópia`,
    cancellations: `Cancelamento pelo Cliente:\\n• 60+ dias antes da partida: reembolso total menos taxa administrativa de 10%\\n• 30–59 dias antes da partida: reembolso de 50%\\n• 14–29 dias antes da partida: reembolso de 25%\\n• Menos de 14 dias antes da partida: sem reembolso\\n• Não comparecimento: sem reembolso\\n\\nCancelamento pela Konijet Ethiopia:\\nSe cancelarmos um tour devido a circunstâncias fora do nosso controle (força maior, desastre natural, avisos de viagem do governo ou tamanho mínimo do grupo não atingido), ofereceremos datas alternativas completas, crédito completo para viagens futuras ou reembolso total em 14 dias úteis.\\n\\nTodos os cancelamentos devem ser enviados por escrito para: booking@konijetethiopia.qzz.io`,
  },
  tr: {
    dataRetention: `Verilerinizi aşağıdaki şekilde saklarız:\\n\\n• Rezervasyon verileri: Seyahat tarihinden itibaren 3 yıl (muhasebe/hukuki uyum için)\\n• Bülten aboneleri: Aboneliği iptal edene kadar\\n• İletişim mesajları: 1 yıl\\n• Analitik veriler: 90 gün (anonimleştirilmiş)\\n\\nHerhangi bir zamanda privacy@konijetethiopia.qzz.io adresine e-posta göndererek verilerinizin silinmesini talep edebilirsiniz.`,
    yourRights: `Konumunuza bağlı olarak aşağıdaki haklara sahipsiniz:\\n\\n• ERİŞİM — Kişisel verilerinizin bir kopyasını talep etme\\n• DÜZELTME — Sakladığımız hatalı verileri düzeltme\\n• SİLME — Verilerinizin silinmesini talep etme ("unutulma hakkı")\\n• KISITLAMA — Verilerinizin işlenmesini sınırlamamızı talep etme\\n• TAŞINABİLİRLİK — Verilerinizi makine tarafından okunabilir formatta alma\\n• İTİRAZ — Meşru çıkarlara dayalı işlemeye itiraz etme\\n• RAZI OLMAYI GERİ ÇEKME — İstediğiniz zaman pazarlama aboneliğini iptal etme\\n\\nprivacy@konijetethiopia.qzz.io adresinden bize ulaşın. 30 gün içinde yanıt vereceğiz.`,
    childrensPrivacy: `Hizmetlerimiz 16 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek kişisel veri toplamıyoruz. Yanlışlıkla böyle veriler topladığımıza inanıyorsanız, lütfen hemen privacy@konijetethiopia.qzz.io adresinden bize ulaşın.`,
    emailMarketing: `Bültenimize abone olduysanız, turlarımız, tekliflerimiz ve seyahat içeriklerimiz hakkında tanıtım e-postaları alacaksınız. Herhangi bir e-postadaki "Aboneliği iptal et" düğmesine tıklayarak veya privacy@konijetethiopia.qzz.io adresine e-posta göndererek istediğiniz zaman aboneliğinizi iptal edebilirsiniz. Pazarlama listelerini, uluslararası e-posta pazarlama yönetmeliklerine uygun sertifikalı bir e-posta hizmet sağlayıcısıyla işliyoruz.`,
    privacyContact: `Gizlilik endişeleri, veri talepleri veya sorular için:\\n\\nKonijet Ethiopia Tourism\\nE-posta: privacy@konijetethiopia.qzz.io\\nAdres: Addis Ababa, Etiyopya`,
    termsContact: `Bu Koşullar hakkında sorular için:\\n\\nKonijet Ethiopia Tourism\\nE-posta: legal@konijetethiopia.qzz.io\\nAdres: Addis Ababa, Etiyopya`,
    cancellations: `Müşteri tarafından iptal:\\n• Hareket tarihinden 60+ gün önce: %10 idari ücret düşülerek tam iade\\n• Hareket tarihinden 30–59 gün önce: %50 iade\\n• Hareket tarihinden 14–29 gün önce: %25 iade\\n• Hareket tarihinden 14 günden az önce: İade yok\\n• Gelmeme: İade yok\\n\\nKonijet Ethiopia tarafından iptal:\\nKontrolümüz dışındaki koşullar nedeniyle (mücbir sebep, doğal afet, hükümet seyahat uyarıları veya minimum grup büyüklüğüne ulaşılamaması) bir turu iptal edersek, tam alternatif tarihler, gelecekteki seyahat için tam kredi veya 14 iş günü içinde tam iade sunacağız.\\n\\nTüm iptaller yazılı olarak şu adrese iletilmelidir: booking@konijetethiopia.qzz.io`,
  },
};

// Map from English prefix to fix key
const ENGLISH_PATTERNS = [
  { prefix: 'We retain your data', key: 'dataRetention' },
  { prefix: 'Depending on your location', key: 'yourRights' },
  { prefix: 'Our services are not directed', key: 'childrensPrivacy' },
  { prefix: 'If you subscribed to our newsletter', key: 'emailMarketing' },
  { prefix: 'For privacy concerns', key: 'privacyContact' },
  { prefix: 'For questions about these Terms', key: 'termsContact' },
  { prefix: 'Cancellation by Client', key: 'cancellations' },
];

let totalFixed = 0;

for (const [lang, translations] of Object.entries(FIXES)) {
  const filePath = path.join(I18N_DIR, `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const { prefix, key } of ENGLISH_PATTERNS) {
    const replacement = translations[key];
    if (!replacement) continue;

    // Find the content line and replace it
    // The content string starts with the English prefix
    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(content: ")${escapedPrefix}[^"]*(?:\\\\.[^"]*)*"`, 'g');
    
    if (regex.test(content)) {
      content = content.replace(regex, `content: "${replacement}"`);
      changed = true;
      totalFixed++;
      console.log(`  [${lang}] Fixed: ${key}`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Saved ${lang}.ts`);
  } else {
    console.log(`ℹ️  ${lang}.ts - no changes needed`);
  }
}

console.log(`\n✅ Total fixes applied: ${totalFixed}`);
