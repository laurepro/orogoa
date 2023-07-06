String.prototype.format = function() {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp("\\{" + i + "\\}", "gi");
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

const i18n = {
  fr: {
    content: "{0}",
    paypal: "Cette application vous plait ?<br>Offrez moi un café !",
    share: "Partagez votre expérience !",
    shom: "Fournies par",
    design: 'Conçues par',
    data: "données de marée",
    cars: "voitures",
    level: "niveau",
    time: "horaire",
    map: "carte",
    credits: "crédits",
    now: "à {0} la mer est à {1}",
    above: "{0} au dessus de la route",
    under: "{0} plus bas que la route",
    next: "prochain passage",
    current: "passage possible jusqu'à {1}",
    range: "entre {0} et {1}",
    tomorrow: "demain",
    disclamer: `
    <h1>Clause de non-responsabilité:</h1>
    <p>La clause de non-responsabilité suivante s'applique à l'utilisation de l'application et doit être lue attentivement. En utilisant cette application, vous reconnaissez et acceptez les termes et conditions décrits ci-dessous :</p>
    <ol>
      <li>L'application est fournie "telle quelle" et nous ne garantissons pas son exactitude, sa fiabilité ou son adéquation à un usage particulier. Bien que nous nous efforcions de fournir des informations exactes et à jour, nous ne pouvons garantir que l'application sera sans erreur ou répondra à vos besoins spécifiques.</li>    
      <li>L'application n'est pas destinée à remplacer les conseils professionnels ou à remplacer les conseils juridiques, médicaux ou réglementaires. Il est de votre responsabilité de vous conformer à toutes les lois, réglementations et protocoles de sécurité applicables.</li>    
      <li>Nous déclinons toute responsabilité quant aux conséquences de votre utilisation ou de votre confiance dans les informations fournies par l'application. Vous reconnaissez que l'utilisation de l'application est à vos propres risques et nous ne serons pas tenus responsables des dommages, pertes ou blessures résultant de son utilisation.</li>    
      <li>L'application peut fournir des consignes de sécurité générales ou des recommandations, mais il est essentiel de se rappeler que ces suggestions ne peuvent garantir la prévention des accidents, des blessures ou des pertes de vie. Il est de votre responsabilité de faire preuve de prudence, de suivre les réglementations et de prendre les mesures appropriées pour assurer la sécurité personnelle et la conformité.</li>    
      <li>Nous n'assumons aucune responsabilité pour les actions, le comportement ou la conduite des utilisateurs de l'application. Vous êtes seul responsable de vos interactions avec les autres et des décisions que vous prenez sur la base des informations fournies par l'application.</li>    
      <li>L'application peut contenir des liens vers des sites Web ou des ressources de tiers. Nous ne sommes pas responsables de la disponibilité, de l'exactitude ou de la fiabilité de ces sites ou ressources externes. L'inclusion de tout lien n'implique pas l'approbation ou l'association avec le site Web ou la ressource liée.</li>
      <li>Nous nous réservons le droit de modifier, suspendre ou résilier l'application à tout moment, sans préavis ni responsabilité.</li>
    </ol>    
    <p>En utilisant cette application, vous acceptez de dégager et de dégager de toute responsabilité les développeurs, propriétaires et affiliés de toute réclamation, dommage, responsabilité ou perte résultant de votre utilisation de l'application, y compris, mais sans s'y limiter, tout manquement à se conformer aux réglementations ou directives.</p>
    <p>Veuillez noter que cette clause de non-responsabilité est destinée à des fins d'information uniquement et ne constitue pas un accord juridiquement contraignant. Pour toute préoccupation juridique ou exigences spécifiques, il est recommandé de consulter un professionnel du droit.</p>
    `
  },
  en: {
    content: "{0}",
    paypal: "Do you like this app?<br/>Buy me a coffee!",
    share: "Share your experience!",
    shom: "Provided by",
    design: 'Designed by',
    data: "tides data",
    cars: "cars",
    level: "level",
    time: "time",
    map: "map",
    credits: "credits",
    now: "at {0} the sea is {1} high",
    above: "{0} above the road",
    under: "{0} lower than the road",
    next: "next pass",
    current: "passage possible until {1}",
    range: "between {0} and {1}",
    tomorrow: "tomorrow",
    disclamer: `
    <h1>Disclaimer:</h1>
    <p>The following disclaimer applies to the use of the application and should be read carefully. By using this application, you acknowledge and accept the terms and conditions outlined below:</p>
    <ol>
      <li>The application is provided on an "as is" basis, and we do not guarantee its accuracy, reliability, or suitability for any particular purpose. While we strive to provide accurate and up-to-date information, we cannot guarantee that the application will be error-free or meet your specific requirements.</li>
      <li>The application is not intended to replace professional advice or serve as a substitute for legal, medical, or regulatory guidance. It is your responsibility to comply with all applicable laws, regulations, and safety protocols.</li>
      <li>We disclaim any liability for the consequences of your use or reliance on the information provided by the application. You acknowledge that the use of the application is at your own risk, and we shall not be held responsible for any damages, losses, or injuries resulting from its use.</li>
      <li>The application may provide general safety guidelines or recommendations, but it is essential to remember that these suggestions cannot guarantee the prevention of accidents, injuries, or loss of life. It is your responsibility to exercise caution, follow regulations, and take appropriate actions to ensure personal safety and compliance.</li>
      <li>We do not assume any responsibility for the actions, behavior, or conduct of users of the application. You are solely responsible for your interactions with others and the decisions you make based on the information provided by the application.</li>
      <li>The application may contain links to third-party websites or resources. We are not responsible for the availability, accuracy, or reliability of such external sites or resources. The inclusion of any link does not imply endorsement or association with the linked website or resource.</li>
      <li>We reserve the right to modify, suspend, or terminate the application at any time, without prior notice or liability.</li>
    </ol>
    <p>By using this application, you agree to release and hold harmless the developers, owners, and affiliates from any claims, damages, liabilities, or losses arising from your use of the application, including but not limited to any failure to comply with regulations or guidelines.</p>
    <p>Please note that this disclaimer is intended for informational purposes only and does not constitute a legally binding agreement. For any legal concerns or specific requirements, it is recommended to consult with a legal professional.</p>
    `
  },
  de: {
    content: "{0}",
    paypal: "Magst du diese App?<br/>Kauf mir einen Kaffee!",
    share: "Teile deine Erfahrung!",
    shom: "Zur Verfügung gestellt von",
    design: "entworfen von",
    data: "Gezeitendaten",
    cars: "autos",
    level: "Höhe",
    time: "Zeitplan",
    map: "karte",
    credits: "crédits",
    now: "Bei {0} ist das Meer {1} hoch",
    above: "{0} über der Straße",
    under: "{0} tiefer als die Straße",
    next: "nächster Durchgang",
    current: "Durchfahrt bis {1} Uhr möglich",
    range: "zwischen {0} und {1}",
    tomorrow: "morgen",
    disclamer: `
    <h1>Haftungsausschluss:</h1>
    <p>Der folgende Haftungsausschluss gilt für die Nutzung der Anwendung und sollte sorgfältig gelesen werden. Durch die Nutzung dieser Anwendung erkennen Sie die unten aufgeführten Bedingungen an und akzeptieren diese:</p>
    <ol>    
      <li>Die Anwendung wird „wie besehen“ bereitgestellt und wir übernehmen keine Garantie für deren Genauigkeit, Zuverlässigkeit oder Eignung für einen bestimmten Zweck. Obwohl wir bestrebt sind, genaue und aktuelle Informationen bereitzustellen, können wir nicht garantieren, dass die Anwendung fehlerfrei ist oder Ihren spezifischen Anforderungen entspricht.</li>    
      <li>Der Antrag soll keine professionelle Beratung ersetzen oder als Ersatz für rechtliche, medizinische oder behördliche Beratung dienen. Es liegt in Ihrer Verantwortung, alle geltenden Gesetze, Vorschriften und Sicherheitsprotokolle einzuhalten.</li>    
      <li>Wir lehnen jegliche Haftung für die Folgen Ihrer Nutzung oder Ihres Vertrauens auf die in der Anwendung bereitgestellten Informationen ab. Sie erkennen an, dass die Nutzung der Anwendung auf Ihr eigenes Risiko erfolgt und wir nicht für Schäden, Verluste oder Verletzungen haftbar gemacht werden, die sich aus der Nutzung ergeben.</li>    
      <li>Die Anwendung kann allgemeine Sicherheitsrichtlinien oder -empfehlungen enthalten, es ist jedoch wichtig zu bedenken, dass diese Vorschläge nicht die Vermeidung von Unfällen, Verletzungen oder Todesfällen garantieren können. Es liegt in Ihrer Verantwortung, Vorsicht walten zu lassen, Vorschriften zu befolgen und geeignete Maßnahmen zu ergreifen, um die persönliche Sicherheit und Compliance zu gewährleisten.</li>    
      <li>Wir übernehmen keine Verantwortung für die Handlungen, das Verhalten oder das Verhalten der Benutzer der Anwendung. Sie tragen die alleinige Verantwortung für Ihre Interaktionen mit anderen und die Entscheidungen, die Sie auf der Grundlage der in der Anwendung bereitgestellten Informationen treffen.</li>    
      <li>Die Anwendung kann Links zu Websites oder Ressourcen Dritter enthalten. Wir sind nicht verantwortlich für die Verfügbarkeit, Genauigkeit oder Zuverlässigkeit solcher externen Websites oder Ressourcen. Die Aufnahme eines Links bedeutet keine Billigung oder Verbindung mit der verlinkten Website oder Ressource.</li>    
      <li>Wir behalten uns das Recht vor, die Anwendung jederzeit und ohne vorherige Ankündigung oder Haftung zu ändern, auszusetzen oder zu beenden.</li>
    </ol>    
    <p>Durch die Nutzung dieser Anwendung erklären Sie sich damit einverstanden, die Entwickler, Eigentümer und verbundenen Unternehmen von allen Ansprüchen, Schäden, Verbindlichkeiten oder Verlusten freizustellen und schadlos zu halten, die sich aus Ihrer Nutzung der Anwendung ergeben, einschließlich, aber nicht beschränkt auf die Nichteinhaltung von Vorschriften oder Richtlinien.</p>    
    <p>Bitte beachten Sie, dass dieser Haftungsausschluss nur zu Informationszwecken dient und keine rechtsverbindliche Vereinbarung darstellt. Bei rechtlichen Bedenken oder spezifischen Anforderungen empfiehlt es sich, einen Anwalt zu konsultieren.</p>
    `
  },
  es: {
    content: "{0}",
    paypal: "¿Te gusta esta app?<br/>¡Cómprame un café!",
    share: "¡Comparte tu experiencia!",
    shom: "Proporcionado por",
    design: "diseñada por",
    data: "datos de mareas",
    cars: "carros",
    level: "nivel",
    time: "horario",
    map: "mapa",
    credits: "creditos",
    now: "en {0} el mar está {1} alto",
    above: "{0} por encima de la carretera",
    under: "{0} más bajo que la carretera",
    next: "siguiente paso",
    current: "pasaje posible hasta las {1}",
    range: "entre {0} y {1}",
    tomorrow: "mañana",
    disclamer: `
    <h1>Descargo de responsabilidad:</h1>
    <p>El siguiente descargo de responsabilidad se aplica al uso de la aplicación y debe leerse detenidamente. Al utilizar esta aplicación, usted reconoce y acepta los términos y condiciones que se describen a continuación:</p>
    <ol>
      <li>La aplicación se proporciona "tal cual" y no garantizamos su precisión, confiabilidad o idoneidad para ningún propósito en particular. Si bien nos esforzamos por brindar información precisa y actualizada, no podemos garantizar que la solicitud esté libre de errores o que cumpla con sus requisitos específicos.</li>    
      <li>La aplicación no pretende reemplazar el asesoramiento profesional ni servir como sustituto de la orientación legal, médica o reglamentaria. Es su responsabilidad cumplir con todas las leyes, reglamentos y protocolos de seguridad aplicables.</li>    
      <li>Renunciamos a cualquier responsabilidad por las consecuencias de su uso o confianza en la información proporcionada por la aplicación. Usted reconoce que el uso de la aplicación es bajo su propio riesgo y no seremos responsables de ningún daño, pérdida o lesión que resulte de su uso.</li>    
      <li>La aplicación puede proporcionar pautas o recomendaciones generales de seguridad, pero es esencial recordar que estas sugerencias no pueden garantizar la prevención de accidentes, lesiones o pérdida de vidas. Es su responsabilidad actuar con precaución, seguir las normas y tomar las medidas adecuadas para garantizar la seguridad personal y el cumplimiento.</li>    
      <li>No asumimos ninguna responsabilidad por las acciones, el comportamiento o la conducta de los usuarios de la aplicación. Usted es el único responsable de sus interacciones con los demás y de las decisiones que tome en función de la información proporcionada por la aplicación.</li>    
      <li>La aplicación puede contener enlaces a sitios web o recursos de terceros. No somos responsables de la disponibilidad, precisión o confiabilidad de dichos sitios o recursos externos. La inclusión de cualquier enlace no implica aprobación o asociación con el sitio web o recurso vinculado.</li>    
      <li>Nos reservamos el derecho de modificar, suspender o cancelar la aplicación en cualquier momento, sin previo aviso ni responsabilidad.</li>
    </ol>
    <p>Al usar esta aplicación, acepta liberar y eximir de responsabilidad a los desarrolladores, propietarios y afiliados de cualquier reclamo, daño, responsabilidad o pérdida que surja de su uso de la aplicación, incluido, entre otros, cualquier incumplimiento de las normas o pautas.</p>
    <p>Tenga en cuenta que este descargo de responsabilidad tiene únicamente fines informativos y no constituye un acuerdo legalmente vinculante. Para cualquier inquietud legal o requisitos específicos, se recomienda consultar con un profesional legal.</p>
    `
  },
};
var locales,
  locale = localStorage.getItem("locale") || "fr";

document.addEventListener("DOMContentLoaded", () => {
  locales = document.querySelector("nav#locales ul");
  locales.addEventListener("click", (event) => {
    changeLang(event.target.getAttribute("id"));
  });
  changeLang(locale);
});
const changeLang = (lang) => {
  locale = lang;
  locales.querySelectorAll(".active").forEach((lang) => lang.classList.remove("active"));
  locales.querySelector("#" + locale).classList.add("active");
  localStorage.setItem("locale", locale);
  translate();
};
const translate = () => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = i18n[locale][key];
    element.innerHTML = translation;
  });
  document.querySelectorAll("[data-i18n-dyn]").forEach((element) => {
    var values = element.getAttribute("data-values");
    if (values) {
      values = values.split(',').map((value)=>{
        if(rdate = value.match( /^([0-9]{2}):([0-9]{2})$/)) {
          var date = new Date(Date.now());
          date.setHours(rdate[1], rdate[2], 0);
          return date.toLocaleTimeString(locale, { timeStyle: 'short' });
        }
        if(rlevel = value.match(/^[+-]?((\d+\.?\d*)|(\.\d+))m$/)) {
          var num = parseFloat(rlevel);
          if(locale == 'en') {
            num = Math.round(num / 0.003048) / 100;
            return num.toLocaleString(locale) + 'ft';
          }
          return num.toLocaleString(locale) + 'm';
        }
        return value;
      })
      const key = element.getAttribute("data-i18n-dyn");
      const translation = i18n[locale][key];
      element.innerHTML = translation.format(...values);
      document.querySelectorAll('.metric').forEach((unit)=>unit.style.display= locale=='en' ? 'none':'');
      document.querySelectorAll('.imperial').forEach((unit)=>unit.style.display= locale=='en' ? '':'none');
    }
  });
};
