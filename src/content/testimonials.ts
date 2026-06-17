import type { Locale } from "@/i18n/routing";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

const people = [
  {
    key: "bertay",
    name: "Bertay Fişekçi",
    image: "/images/references/bertay-fisekci.webp",
  },
  {
    key: "talha",
    name: "Op. Dr. Talha Ayvaz",
    image: "/images/references/talha-ayvaz.webp",
  },
  {
    key: "dogukan",
    name: "Op. Dr. H. Doğukan Özkan",
    image: "/images/references/dogukan-ozkan.webp",
  },
  {
    key: "cuneyt",
    name: "Cüneyt H. Fındık",
    image: "/images/references/cuneyt-findik.webp",
  },
  {
    key: "elijah",
    name: "Elijah Hudry",
    image: "/images/references/elijah-hudry.webp",
  },
  {
    key: "sebastian",
    name: "Sebastian Hunt",
    image: "/images/references/sebastian-hunt.webp",
  },
] as const;

const roles: Record<Locale, string[]> = {
  tr: [
    "Kurucu, Bertay Fişekçi Danışmanlık ve Eğitim, İzmir",
    "Kadın Hastalıkları ve Doğum Uzmanı, Eskişehir",
    "Kadın Hastalıkları, Doğum ve Tüp Bebek Uzmanı, Ankara",
    "Kurucu, CF Mimarlık, İstanbul",
    "Tamborine Mountain, Avustralya",
    "Los Angeles, Amerika Birleşik Devletleri",
  ],
  en: [
    "Founder, Bertay Fişekçi Consulting and Training, İzmir",
    "Obstetrician and Gynecologist, Eskişehir",
    "Obstetrics, Gynecology and IVF Specialist, Ankara",
    "Founder, CF Architecture, Istanbul",
    "Tamborine Mountain, Australia",
    "Los Angeles, United States",
  ],
  de: [
    "Gründer, Bertay Fişekçi Beratung und Training, İzmir",
    "Facharzt für Gynäkologie und Geburtshilfe, Eskişehir",
    "Facharzt für Gynäkologie, Geburtshilfe und IVF, Ankara",
    "Gründer, CF Architektur, Istanbul",
    "Tamborine Mountain, Australien",
    "Los Angeles, Vereinigte Staaten",
  ],
  fr: [
    "Fondateur, Bertay Fişekçi Conseil et Formation, İzmir",
    "Gynécologue-obstétricien, Eskişehir",
    "Spécialiste en gynécologie, obstétrique et FIV, Ankara",
    "Fondateur, CF Architecture, Istanbul",
    "Tamborine Mountain, Australie",
    "Los Angeles, États-Unis",
  ],
  nl: [
    "Oprichter, Bertay Fişekçi Consultancy en Training, İzmir",
    "Gynaecoloog en verloskundige, Eskişehir",
    "Specialist gynaecologie, verloskunde en IVF, Ankara",
    "Oprichter, CF Architectuur, Istanbul",
    "Tamborine Mountain, Australië",
    "Los Angeles, Verenigde Staten",
  ],
  it: [
    "Fondatore, Bertay Fişekçi Consulenza e Formazione, İzmir",
    "Ginecologo e ostetrico, Eskişehir",
    "Specialista in ginecologia, ostetricia e fecondazione assistita, Ankara",
    "Fondatore, CF Architettura, Istanbul",
    "Tamborine Mountain, Australia",
    "Los Angeles, Stati Uniti",
  ],
  es: [
    "Fundador, Bertay Fişekçi Consultoría y Formación, İzmir",
    "Ginecólogo y obstetra, Eskişehir",
    "Especialista en ginecología, obstetricia y FIV, Ankara",
    "Fundador, CF Arquitectura, Estambul",
    "Tamborine Mountain, Australia",
    "Los Ángeles, Estados Unidos",
  ],
};

const quotes: Record<Locale, string[]> = {
  tr: [
    "OzGen AI ile 3 yıldır aktif olarak çalışıyorum. Web sitemle ilgili tüm güncellemeler, yeni fikirler, farklı amaçlar için site oluşturma, siteyi e-ticaret yapısına dönüştürme ve teknoloji tarafında aldığım tüm hizmetten çok memnunum. Onları hizmet aldığım biri gibi değil, benimle birlikte başarım için emek veren bir yol arkadaşı gibi görüyorum. Site yapımı ve yürütülmesi gibi konularda içim çok rahat; bu alanlara neredeyse hiç zaman ayırmıyorum.",
    "OzGen AI ile çalışmadan önce aylık sadece 15-20 yeni hasta alıyordum. Eski ve birçok yeri çalışmayan sitemizi yeniledikten ve dijital pazarlama stratejilerini uyguladıktan sonra bu sayı 60-70’lere yükseldi. Hastalarım artık beni internette kolayca bulabiliyor. En güzel tarafı hiçbir şeye vakit ayırmama gerek kalmadı; sadece ne tedavileri sunduğumu söyledim ve kısa sürede her şey hazırdı.",
    "Muayenehanem için yaptırdığım web sitesi beklentilerimin ötesinde. Tam olarak istediğim siteye kavuştum, 80’den fazla yazımı yayınladım ve kendim kullanabileceğim kadar basit bir arayüzle yeni yazılarımı yayınlamaya devam ediyorum. Tüm isteklerime çok hızlı cevap alıyorum. En kısa sürede dijital pazarlama paketine geçiş yapacağım.",
    "Ortağım ile birlikte 10’a yakın web sitesini teslim aldık. Konu kişisel web sitesi, kurumsal web sitesi veya küçük girişimlerimiz olsun; süslü cümlelerle oyalamadan hızlı aksiyon alan, net bir ekip. Kesinlikle tavsiye ediyorum.",
    "Daha önce deneyimlemediğim kadar net bir iletişimdi. Neye ihtiyacım olduğu hemen anlaşıldı ve işe doğrudan başlandı. Alakasız görünen sorularımda bile bilgiliydiler; henüz hayır veya mümkün değil gibi bir cevap almadım. Gelecekteki tüm işlerimde OzGen AI ile iletişimde olacağımdan emin olabilirsiniz.",
    "Tam kapsamlı bir hizmet arıyorsanız, gitmeniz gereken ekip burası. İstediğimiz tüm özellikleri en yakın tekliften çok daha uygun maliyetle, daha kısa sürede ve minimum iletişim ihtiyacıyla geliştirdiler. Kesinlikle tavsiye ederim.",
  ],
  en: [
    "I have been actively working with OzGen AI for three years. I am very happy with every service I received: website updates, new ideas, building sites for different goals, turning a website into an e-commerce structure and handling the technology side. I do not see them only as a supplier; I see them as a partner working for my success. I am completely comfortable with website build and maintenance, so I almost never have to spend time on it.",
    "Before working with OzGen AI, I was receiving only 15-20 new patients per month. After renewing our old, partly broken website and applying digital marketing strategies, this rose to 60-70. Patients can now find me online much more easily. The best part was that I did not need to spend time on anything; I only explained which treatments I offer and everything was ready quickly.",
    "The website built for my clinic exceeded my expectations. I got exactly the site I wanted, published more than 80 articles and can keep publishing new ones through an interface simple enough to use myself. Every request gets a fast response. I will move to the digital marketing package as soon as possible.",
    "Together with my partner, we received nearly 10 websites. Whether it was a personal site, a corporate website or one of our small ventures, the team acted fast and stayed clear without wasting time on decorative talk. I definitely recommend them.",
    "The communication was unlike anything I had experienced before. What I needed was understood immediately and the work started directly. Even with unrelated questions, they were knowledgeable; I have not yet received a ‘no’ or ‘not possible’ answer. You can be sure I will contact OzGen AI for all future work.",
    "If you are looking for a full-service team, this is the one to go to. They built every feature we wanted at a much better cost than the closest offer, in less time and with minimal communication needed. I definitely recommend them.",
  ],
  de: [
    "Ich arbeite seit drei Jahren aktiv mit OzGen AI zusammen. Website-Updates, neue Ideen, Seiten für unterschiedliche Ziele, E-Commerce-Strukturen und die gesamte technische Betreuung waren sehr überzeugend. Für mich ist OzGen AI nicht nur ein Dienstleister, sondern ein Partner, der an meinem Erfolg arbeitet. Bei Aufbau und Pflege der Website bin ich völlig entspannt und muss mich kaum darum kümmern.",
    "Vor OzGen AI bekam ich monatlich nur 15-20 neue Patienten. Nach der Erneuerung unserer alten Website und der Umsetzung digitaler Marketingstrategien stieg diese Zahl auf 60-70. Patienten finden mich jetzt online viel leichter. Das Beste war: Ich musste fast keine Zeit investieren; ich erklärte nur meine Behandlungen und alles war schnell bereit.",
    "Die Website für meine Praxis hat meine Erwartungen übertroffen. Ich bekam genau die Seite, die ich wollte, veröffentlichte mehr als 80 Artikel und kann neue Inhalte selbst über eine einfache Oberfläche pflegen. Auf meine Wünsche wird sehr schnell reagiert. Als Nächstes werde ich das digitale Marketingpaket nutzen.",
    "Zusammen mit meinem Partner haben wir fast 10 Websites erhalten. Ob persönliche Website, Unternehmensseite oder kleines Projekt: Das Team handelt schnell, bleibt klar und verliert keine Zeit mit leeren Worten. Ich empfehle sie definitiv.",
    "Die Kommunikation war klarer als alles, was ich zuvor erlebt hatte. Mein Bedarf wurde sofort verstanden und die Arbeit begann direkt. Auch bei scheinbar fremden Fragen war das Team kompetent; ein Nein oder Geht nicht habe ich bisher nicht gehört. Für zukünftige Projekte werde ich OzGen AI wieder kontaktieren.",
    "Wenn Sie einen Full-Service-Partner suchen, ist dieses Team die richtige Adresse. Alle gewünschten Funktionen wurden günstiger als das nächstliegende Angebot, schneller und mit minimalem Abstimmungsaufwand umgesetzt. Klare Empfehlung.",
  ],
  fr: [
    "Je travaille activement avec OzGen AI depuis trois ans. Mises à jour du site, nouvelles idées, sites pour différents objectifs, transformation en e-commerce et accompagnement technique: tout a été très satisfaisant. Je ne les vois pas seulement comme un prestataire, mais comme un partenaire qui travaille pour ma réussite. Je suis très serein sur la création et la gestion du site, donc je n’ai presque pas besoin d’y consacrer du temps.",
    "Avant OzGen AI, je recevais seulement 15-20 nouveaux patients par mois. Après la refonte de notre ancien site et la mise en place de stratégies de marketing digital, ce chiffre est monté à 60-70. Les patients me trouvent maintenant beaucoup plus facilement en ligne. Le plus agréable: je n’ai presque rien eu à gérer, j’ai seulement expliqué mes traitements et tout a été prêt rapidement.",
    "Le site créé pour mon cabinet a dépassé mes attentes. J’ai obtenu exactement le site que je voulais, publié plus de 80 articles et je peux continuer à publier moi-même grâce à une interface simple. Toutes mes demandes reçoivent une réponse rapide. Je passerai très bientôt au package de marketing digital.",
    "Avec mon associé, nous avons reçu près de 10 sites web. Qu’il s’agisse d’un site personnel, corporate ou d’un petit projet, l’équipe agit vite et reste claire sans perdre de temps avec de grands discours. Je les recommande sans hésiter.",
    "La communication était d’une clarté que je n’avais pas connue auparavant. Mon besoin a été compris immédiatement et le travail a commencé directement. Même sur des questions éloignées, l’équipe avait les réponses; je n’ai pas encore reçu de réponse du type non ou impossible. Je recontacterai OzGen AI pour mes futurs projets.",
    "Si vous cherchez une équipe complète, c’est celle qu’il faut choisir. Toutes les fonctionnalités demandées ont été développées à un coût bien meilleur que l’offre la plus proche, en moins de temps et avec très peu d’échanges nécessaires. Je recommande vivement.",
  ],
  nl: [
    "Ik werk al drie jaar actief met OzGen AI. Website-updates, nieuwe ideeën, sites voor verschillende doelen, een e-commerce structuur en de technische kant zijn allemaal heel goed verzorgd. Ik zie hen niet alleen als leverancier, maar als partner die meewerkt aan mijn succes. Over bouw en beheer van de website ben ik volledig gerust, waardoor ik er bijna geen tijd aan hoef te besteden.",
    "Voor OzGen AI kreeg ik maandelijks slechts 15-20 nieuwe patiënten. Na het vernieuwen van onze oude website en het toepassen van digitale marketingstrategieën steeg dit naar 60-70. Patiënten vinden mij nu veel makkelijker online. Het beste was dat ik er bijna geen tijd aan kwijt was; ik vertelde alleen welke behandelingen ik aanbied en alles was snel klaar.",
    "De website voor mijn praktijk overtrof mijn verwachtingen. Ik kreeg precies de site die ik wilde, publiceerde meer dan 80 artikelen en kan via een eenvoudige interface zelf nieuwe teksten blijven plaatsen. Op mijn verzoeken wordt snel gereageerd. Binnenkort stap ik over naar het digitale marketingpakket.",
    "Samen met mijn partner hebben we bijna 10 websites ontvangen. Of het nu ging om een persoonlijke site, corporate website of klein project: het team onderneemt snel actie en blijft helder zonder onnodige verkooppraat. Ik raad ze zeker aan.",
    "De communicatie was duidelijker dan ik eerder had meegemaakt. Wat ik nodig had werd direct begrepen en het werk begon meteen. Ook bij ogenschijnlijk losse vragen was het team deskundig; ik heb nog geen nee of onmogelijk gehoord. Voor toekomstig werk neem ik zeker contact op met OzGen AI.",
    "Als u een full-service team zoekt, moet u hier zijn. Alle gewenste functies zijn ontwikkeld tegen een veel betere prijs dan de dichtstbijzijnde offerte, in minder tijd en met minimale communicatie. Zeker aanbevolen.",
  ],
  it: [
    "Lavoro attivamente con OzGen AI da tre anni. Aggiornamenti del sito, nuove idee, siti per obiettivi diversi, trasformazione in e-commerce e supporto tecnico sono stati tutti eccellenti. Non li considero solo un fornitore, ma un partner che lavora per il mio successo. Mi sento tranquillo sulla creazione e gestione del sito, quindi quasi non devo dedicarci tempo.",
    "Prima di OzGen AI ricevevo solo 15-20 nuovi pazienti al mese. Dopo il rinnovo del vecchio sito e l’applicazione delle strategie di marketing digitale, il numero è salito a 60-70. I pazienti ora mi trovano online molto più facilmente. La parte migliore è che non ho dovuto perdere tempo: ho solo spiegato quali trattamenti offro e tutto è stato pronto rapidamente.",
    "Il sito realizzato per il mio studio ha superato le aspettative. Ho ottenuto esattamente il sito che volevo, pubblicato più di 80 articoli e posso continuare a pubblicare da solo con un’interfaccia semplice. Ogni richiesta riceve risposta rapida. Passerò presto al pacchetto di marketing digitale.",
    "Con il mio socio abbiamo ricevuto quasi 10 siti web. Che fosse un sito personale, corporate o un piccolo progetto, il team ha agito rapidamente e con chiarezza, senza perdere tempo in frasi decorative. Li consiglio sicuramente.",
    "La comunicazione è stata più chiara di qualsiasi esperienza precedente. Il bisogno è stato capito subito e il lavoro è partito direttamente. Anche su domande apparentemente scollegate, il team era preparato; non ho ancora ricevuto un no o non è possibile. Per i prossimi lavori contatterò OzGen AI.",
    "Se cercate un team full-service, questo è quello giusto. Hanno sviluppato tutte le funzionalità richieste a un costo molto migliore rispetto all’offerta più vicina, in meno tempo e con pochissima comunicazione necessaria. Assolutamente consigliati.",
  ],
  es: [
    "Trabajo activamente con OzGen AI desde hace tres años. Actualizaciones web, nuevas ideas, sitios para distintos objetivos, estructura e-commerce y soporte técnico: todo ha sido excelente. No los veo solo como un proveedor, sino como un socio que trabaja por mi éxito. Estoy totalmente tranquilo con la creación y gestión del sitio, así que casi no tengo que dedicarle tiempo.",
    "Antes de OzGen AI recibía solo 15-20 pacientes nuevos al mes. Después de renovar nuestro sitio antiguo y aplicar estrategias de marketing digital, la cifra subió a 60-70. Ahora los pacientes me encuentran en internet con mucha más facilidad. Lo mejor fue que no tuve que dedicar tiempo: solo expliqué qué tratamientos ofrezco y todo estuvo listo rápidamente.",
    "El sitio creado para mi clínica superó mis expectativas. Obtuve exactamente la web que quería, publiqué más de 80 artículos y puedo seguir publicando nuevos contenidos con una interfaz simple. Todas mis solicitudes reciben respuesta rápida. Pronto pasaré al paquete de marketing digital.",
    "Junto con mi socio recibimos cerca de 10 sitios web. Ya fuera un sitio personal, corporativo o un pequeño proyecto, el equipo actuó rápido y con claridad, sin perder tiempo en discursos vacíos. Los recomiendo totalmente.",
    "La comunicación fue más clara que cualquier experiencia previa. Entendieron de inmediato lo que necesitaba y empezaron directamente. Incluso ante preguntas aparentemente ajenas, el equipo tenía respuestas; todavía no he recibido un no o no es posible. Para trabajos futuros contactaré con OzGen AI.",
    "Si buscas un equipo de servicio completo, este es el indicado. Desarrollaron todas las funciones que pedimos con un coste mucho mejor que la oferta más cercana, en menos tiempo y con mínima comunicación necesaria. Los recomiendo sin duda.",
  ],
};

export function getTestimonials(locale: Locale): Testimonial[] {
  return people.map((person, index) => ({
    quote: quotes[locale]?.[index] ?? quotes.en[index],
    name: person.name,
    role: roles[locale]?.[index] ?? roles.en[index],
    image: person.image,
  }));
}
