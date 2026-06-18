const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const translations = {
  mi: {
    "nav.about": "Mō Aspire",
    "nav.offer": "Ā mātou ratonga",
    "nav.advocacy": "Kōkiri whaiaro",
    "nav.team": "Tūtaki ki te rōpū",
    "nav.foundation": "Foundation",
    "nav.newsletter": "Pūrongo me ngā hui",
    "nav.join": "Hono mai",
    "nav.contact": "Whakapā",
    "home.eyebrow": "Tautoko hauātanga Waikato",
    "home.title": "Kia ora ai koe, mā tāu ake ara.",
    "home.intro": "Ka mahi tahi a Aspire Community Support ki te hunga whaikaha, ki ngā whānau, kia whai kāinga haumaru, tautoko ngāwari, hononga hapori, ā, kia rangona hoki tō rātou reo.",
    "home.explore": "Tirohia ngā tautoko",
    "home.conversation": "Tīmata he kōrero",
    "home.person": "Tautoko ā-tangata",
    "home.supportTitle": "Ka hangaia te tautoko ki te tangata, kaua ki te hōtaka.",
    "home.supportLead": "Mai i ngā kāinga hapori e tautokona ana i ngā hāora katoa, ki ngā tautoko ngāwari me Foundation, ka aro a Aspire ki ngā whāinga, ngā hononga, te rangatiratanga, me te whai wāhi.",
    "values.questionMi": "He aha te mea nui o te ao?",
    "values.questionEn": "What is the most important thing in the world?",
    "values.answerMi": "He tāngata, he tāngata, he tāngata.",
    "values.answerEn": "It is people, it is people, it is people.",
    "values.kicker": "Tō mātou tirohanga me ngā uara",
    "values.vision": "Kia ora ai te tangata ki tōna tino taumata.",
    "values.purpose": "Te whakaputa hua pai ki roto i ngā oranga o te tangata, ia rā.",
    "values.excellence": "Kairangi",
    "values.excellenceText": "Kia eke ki te taumata pai rawa.",
    "values.partnership": "Mahi ngātahi",
    "values.partnershipText": "He pai ake te mahi tahi.",
    "values.innovation": "Auahatanga",
    "values.innovationText": "Whakatupu i te auaha.",
    "values.kindness": "Manaakitanga",
    "values.kindnessText": "Nō te ngākau.",
    "values.philosophyTitle": "Tō mātou aronga",
    "values.philosophy": "E whakapono ana mātou ki te pai o te tangata, ā, ka aro ki te whakawhanake i ō rātou pūkenga me ō rātou āheinga. E whakapono ana mātou he wāhi nui tō ia tangata ki tōna hapori, ā, ina noho te tangata ki te iho o ā mātou mahi katoa, ka tika te ara.",
    "access.kicker": "Te uru ki Aspire",
    "access.title": "Ka tīmata te ara ki tētahi kōrero māmā.",
    "access.lead": "He uaua pea te kōwhiri i te ratonga tautoko tika. Ka ārahi mātou i a koe me tō whānau, ka whakautu pātai, ka kimi kōwhiringa, ā, ka āwhina kia mōhio mēnā ko Aspire te ratonga tika.",
    "access.contact": "Whakapā mai ki Aspire",
    "access.pathways": "Tirohia ngā ara tautoko"
  }
};

const navTranslations = {
  mi: {
    "about.html": "Mō Aspire",
    "what-we-offer.html": "Ā mātou ratonga",
    "self-advocacy.html": "Kōkiri whaiaro",
    "team.html": "Tūtaki ki te rōpū",
    "foundation.html": "Foundation",
    "news-events.html": "Pūrongo me ngā hui",
    "join.html": "Hono mai",
    "contact.html": "Whakapā"
  }
};

const defaultText = new Map();
document.querySelectorAll("[data-i18n], .nav-links > a").forEach((node) => {
  defaultText.set(node, node.textContent);
});

function setLanguage(language) {
  const isMaori = language === "mi";
  document.documentElement.lang = isMaori ? "mi-NZ" : "en-NZ";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = isMaori && translations.mi[key] ? translations.mi[key] : defaultText.get(node);
  });
  document.querySelectorAll(".nav-links > a").forEach((node) => {
    const href = node.getAttribute("href");
    node.textContent = isMaori && navTranslations.mi[href] ? navTranslations.mi[href] : defaultText.get(node);
  });
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const selected = button.getAttribute("data-lang-option") === language;
    button.setAttribute("aria-pressed", String(selected));
  });
  localStorage.setItem("aspire-language", language);
}

document.querySelectorAll("[data-lang-option]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.getAttribute("data-lang-option")));
});

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
setLanguage(requestedLanguage === "mi" ? "mi" : localStorage.getItem("aspire-language") || "en");

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const enquiryType = form.querySelector("[data-enquiry-type]");
  const requestedType = new URLSearchParams(window.location.search).get("type");
  if (requestedType && enquiryType) {
    const matchingOption = Array.from(enquiryType.options).find((option) => option.text === requestedType);
    if (matchingOption) {
      enquiryType.value = matchingOption.value;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "This form needs to be connected to a secure submission service before launch. Please email reception@aspire.org.nz or call 07 839 0183.";
    }
  });
});

const socialLinks = [
  {
    label: "Facebook",
    shortLabel: "Fb",
    href: "https://www.facebook.com/aspire.community.support"
  },
  {
    label: "YouTube",
    shortLabel: "Yt",
    href: "https://www.youtube.com/@aspire-communitysupport8408"
  },
  {
    label: "Instagram",
    shortLabel: "Ig",
    href: "#",
    placeholder: true
  },
  {
    label: "LinkedIn",
    shortLabel: "In",
    href: "#",
    placeholder: true
  },
  {
    label: "TikTok",
    shortLabel: "Tk",
    href: "#",
    placeholder: true
  }
];

document.querySelectorAll(".site-footer").forEach((footerNode) => {
  if (footerNode.querySelector(".footer-social")) {
    return;
  }

  const social = document.createElement("div");
  social.className = "footer-social";

  const title = document.createElement("strong");
  title.textContent = "Follow Aspire";
  social.append(title);

  const list = document.createElement("div");
  list.className = "social-links";

  socialLinks.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.shortLabel;
    link.setAttribute("aria-label", item.placeholder ? `${item.label} coming soon` : item.label);
    link.title = item.placeholder ? `${item.label} coming soon` : item.label;

    if (item.placeholder) {
      link.className = "is-placeholder";
      link.addEventListener("click", (event) => event.preventDefault());
    } else {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    list.append(link);
  });

  social.append(list);

  const connectLinks = Array.from(footerNode.querySelectorAll(".footer-links")).find((linksNode) => {
    const heading = linksNode.querySelector("strong");
    return heading && heading.textContent.trim() === "Connect";
  });
  const footerInner = footerNode.querySelector(".footer-inner");
  const footerBottom = footerNode.querySelector(".footer-bottom");

  if (connectLinks) {
    connectLinks.append(social);
  } else if (footerInner && footerBottom) {
    footerInner.insertBefore(social, footerBottom);
  }
});

const newsletterMount = document.querySelector("[data-newsletters]");

function appendText(parent, tagName, text, className) {
  const node = document.createElement(tagName);
  if (className) {
    node.className = className;
  }
  node.textContent = text || "";
  parent.append(node);
  return node;
}

function safeRelativeUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.includes("\\") || trimmed.startsWith("//")) {
    return "";
  }

  return trimmed;
}

function appendAction(parent, href, label, variant = "secondary", options = {}) {
  const safeHref = safeRelativeUrl(href);
  if (!safeHref) {
    return null;
  }

  const actions = parent.querySelector(":scope > .actions") || document.createElement("div");
  actions.className = "actions";
  const link = document.createElement("a");
  link.className = `button ${variant}`;
  link.href = safeHref;
  link.textContent = label;
  if (options.blank) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  if (options.download) {
    link.setAttribute("download", "");
  }
  actions.append(link);
  if (!actions.parentElement) {
    parent.append(actions);
  }
  return link;
}

if (newsletterMount && window.AspireNewsletters) {
  window.AspireNewsletters.forEach((newsletter) => {
    const article = document.createElement("article");
    article.className = "card newsletter-card";
    appendText(article, "span", `${newsletter.season || ""} ${newsletter.year || ""}`.trim(), "kicker");
    appendText(article, "h3", newsletter.title);
    appendText(article, "p", newsletter.description);
    appendAction(article, newsletter.file, "Open PDF", "primary", { blank: true });
    appendAction(article, newsletter.file, "Download", "secondary", { download: true });
    newsletterMount.append(article);
  });
}

function appendNewsImage(parent, item) {
  const media = document.createElement("div");
  media.className = "news-card-media";
  if (item.image) {
    const safeImage = safeRelativeUrl(item.image);
    if (safeImage) {
      const image = document.createElement("img");
      image.src = safeImage;
      image.alt = "";
      image.loading = "lazy";
      media.append(image);
      parent.append(media);
      return media;
    }
  }

  const placeholder = document.createElement("div");
  placeholder.className = "news-card-placeholder";
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.textContent = item.category || "Aspire";
  media.append(placeholder);
  parent.append(media);
  return media;
}

function initials(name) {
  return (name || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function appendPersonImage(parent, person, className = "team-photo") {
  const wrapper = document.createElement("div");
  wrapper.className = className;
  const safeImage = safeRelativeUrl(person.image);
  if (safeImage) {
    const image = document.createElement("img");
    image.src = safeImage;
    image.alt = "";
    image.loading = "lazy";
    wrapper.append(image);
  } else {
    wrapper.textContent = initials(person.name);
  }
  parent.append(wrapper);
  return wrapper;
}

const newsPostsMount = document.querySelector("[data-news-posts]");

if (newsPostsMount && window.AspireNewsPosts) {
  window.AspireNewsPosts.forEach((post) => {
    const article = document.createElement("article");
    article.className = "card news-card";
    appendNewsImage(article, post);
    const body = document.createElement("div");
    body.className = "news-card-body";
    appendText(body, "span", `${post.category || "News"}${post.date ? ` · ${post.date}` : ""}`, "kicker");
    appendText(body, "h3", post.title);
    appendText(body, "p", post.summary);
    appendAction(body, post.link, "Read more");
    article.append(body);
    newsPostsMount.append(article);
  });
}

const eventsMount = document.querySelector("[data-events]");

if (eventsMount && window.AspireEvents) {
  window.AspireEvents.forEach((event) => {
    const article = document.createElement("article");
    article.className = "card news-card";
    appendNewsImage(article, event);
    const body = document.createElement("div");
    body.className = "news-card-body";
    appendText(body, "span", event.category || "Event", "kicker");
    const title = appendText(body, "h3", event.title);
    const date = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = event.date || "";
    date.append(strong);
    if (event.time) {
      date.append(document.createTextNode(` · ${event.time}`));
    }
    body.append(date);
    appendText(body, "p", event.location);
    appendText(body, "p", event.summary);
    appendAction(body, event.link, "Event details");
    article.append(body);
    eventsMount.append(article);
  });
}

const storiesMount = document.querySelector("[data-stories]");

if (storiesMount && window.AspireStories) {
  window.AspireStories.forEach((story) => {
    const article = document.createElement("article");
    article.className = "card news-card story-card";
    appendNewsImage(article, { image: story.image, category: story.person || "Story" });
    const body = document.createElement("div");
    body.className = "news-card-body";
    appendText(body, "span", story.person || "Aspire story", "kicker");
    appendText(body, "h3", story.title);
    appendText(body, "p", story.summary);
    if (story.quote) {
      appendText(body, "blockquote", story.quote);
    }
    appendAction(body, story.link, "Read story");
    article.append(body);
    storiesMount.append(article);
  });
}

function appendTestimonial(parent, testimonial) {
  const article = document.createElement("article");
  article.className = "testimonial-card";
  appendText(article, "blockquote", testimonial.quote);
  const meta = document.createElement("p");
  meta.className = "testimonial-meta";
  const name = document.createElement("strong");
  name.textContent = testimonial.name || "Aspire testimonial";
  meta.append(name);
  if (testimonial.context) {
    meta.append(document.createTextNode(` · ${testimonial.context}`));
  }
  article.append(meta);
  parent.append(article);
}

const footer = document.querySelector(".site-footer");

if (footer && window.AspireTestimonials && window.AspireTestimonials.length) {
  const section = document.createElement("section");
  section.className = "testimonial-strip";
  section.setAttribute("aria-label", "Stories and testimonials");

  const inner = document.createElement("div");
  inner.className = "testimonial-inner";
  appendText(inner, "span", "Stories & testimonials", "kicker");
  appendText(inner, "h2", "What people say about Aspire");

  const viewport = document.createElement("div");
  viewport.className = "testimonial-marquee";
  const track = document.createElement("div");
  track.className = "testimonial-track";
  window.AspireTestimonials.forEach((testimonial) => appendTestimonial(track, testimonial));
  window.AspireTestimonials.forEach((testimonial) => appendTestimonial(track, testimonial));
  viewport.append(track);
  inner.append(viewport);
  section.append(inner);
  footer.before(section);
}

const vacanciesMount = document.querySelector("[data-vacancies]");

function appendRoleCard(parent, role, actionLabel, actionVariant = "secondary") {
  const article = document.createElement("article");
  article.className = "card vacancy-card";
  appendText(article, "span", role.type, "kicker");
  appendText(article, "h3", role.title);
  const location = document.createElement("p");
  appendText(location, "strong", role.location);
  article.append(location);
  if (role.closingDate) {
    appendText(article, "p", `Closing date: ${role.closingDate}`);
  }
  appendText(article, "p", role.summary);
  appendAction(article, role.link, actionLabel, actionVariant);
  parent.append(article);
}

const jobOpeningsMount = document.querySelector("[data-job-openings]");

if (jobOpeningsMount && window.AspireJobOpenings) {
  if (window.AspireJobOpenings.length) {
    window.AspireJobOpenings.forEach((role) => {
      appendRoleCard(jobOpeningsMount, role, "Apply for this role", "primary");
    });
  } else {
    const article = document.createElement("article");
    article.className = "card vacancy-card";
    appendText(article, "span", "Current openings", "kicker");
    appendText(article, "h3", "No current vacancies listed");
    appendText(article, "p", "Please register your interest below and Aspire can keep your details for suitable future opportunities once the recruitment workflow is connected.");
    appendAction(article, "application.html", "Register interest");
    jobOpeningsMount.append(article);
  }
}

if (vacanciesMount && window.AspireVacancies) {
  window.AspireVacancies.forEach((role) => {
    appendRoleCard(vacanciesMount, role, role.actionLabel || "Register interest");
  });
}

const applicationForm = document.querySelector("[data-application-form]");

if (applicationForm) {
  const roleFromUrl = new URLSearchParams(window.location.search).get("role");
  const roleField = applicationForm.querySelector("[data-role-field]");
  if (roleFromUrl && roleField) {
    const matchingOption = Array.from(roleField.options).find((option) => option.text === roleFromUrl);
    if (matchingOption) {
      roleField.value = matchingOption.value;
    } else {
      const option = document.createElement("option");
      option.textContent = roleFromUrl;
      option.value = roleFromUrl;
      roleField.append(option);
      roleField.value = roleFromUrl;
    }
  }

  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = applicationForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "This application form is ready for SharePoint or another secure recruitment workflow. Please connect the form before launch so CVs and cover letters are stored safely.";
    }
  });
}

const teamMount = document.querySelector("[data-team-sections]");

if (teamMount && window.AspireTeamSections) {
  window.AspireTeamSections.forEach((section) => {
    const sectionNode = document.createElement("section");
    sectionNode.className = "team-section";
    appendText(sectionNode, "h2", section.title);
    const grid = document.createElement("div");
    grid.className = "team-grid";
    (section.people || []).forEach((person) => {
      const card = document.createElement("article");
      card.className = "team-card";
      appendPersonImage(card, person);
      appendText(card, "h3", person.name);
      appendText(card, "p", person.role);
      if (person.bio) {
        appendText(card, "small", person.bio);
      }
      grid.append(card);
    });
    sectionNode.append(grid);
    teamMount.append(sectionNode);
  });
}

const boardMount = document.querySelector("[data-board-members]");

if (boardMount && window.AspireBoardMembers) {
  window.AspireBoardMembers.forEach((member) => {
    const article = document.createElement("article");
    article.className = "profile-detail";
    appendPersonImage(article, member, "board-photo");
    const body = document.createElement("div");
    appendText(body, "span", member.role, "kicker");
    appendText(body, "h2", member.name);
    appendText(body, "p", member.bio);
    article.append(body);
    boardMount.append(article);
  });
}
