const projects = {
  "rail-station": {
    index: "01",
    category: "Transportation / Architecture",
    title: "FIVE HUNDRED MILES",
    chineseTitle: "高铁站房设计",
    year: "2020",
    location: "河北唐山 / Tangshan",
    role: "课程设计 / 独立完成",
    description:
      "以“乡愁”与归途为叙事线索，用连续檐廊、通透候车厅和具有方向性的公共界面回应高铁站与平原环境的关系。设计尝试让交通建筑不只是效率容器，也能承载地方记忆与日常情感。",
    facts: [
      ["Type", "Transportation"],
      ["Year", "2020"],
      ["Role", "Solo"],
      ["Location", "Tangshan, CN"],
    ],
    pages: ["04", "05", "06", "07", "08", "09"],
  },
  kindergarten: {
    index: "02",
    category: "Education / Architecture",
    title: "稚园 · 拾光",
    chineseTitle: "幼儿园设计",
    year: "2020",
    location: "福建南平 / Nanping",
    role: "台达杯优秀奖 / 合作完成",
    description:
      "把幼儿尺度拆解为连续的坡屋顶庭院、自由穿行的路径和可感知自然变化的室内外边界。空间在活动、采光与城市界面之间自然渗透，让孩子的日常探索成为建筑组织的一部分。",
    facts: [
      ["Type", "Education"],
      ["Year", "2020"],
      ["Award", "Delta Cup"],
      ["Location", "Nanping, CN"],
    ],
    pages: ["10", "11", "12", "13", "14", "15"],
  },
  xiongan: {
    index: "03",
    category: "Culture / Public Building",
    title: "山水营国",
    chineseTitle: "雄安新区中国馆设计",
    year: "2022",
    location: "河北雄安 / Xiong'an",
    role: "毕业设计 / 独立完成",
    description:
      "以传统山水秩序组织雄安中国馆的展陈空间、庭院与公共动线，在当代城市语境中重新讨论“园”与“馆”的关系。屋面、院落与步行动线共同构成一组面向公众开放的文化地形。",
    facts: [
      ["Type", "Cultural"],
      ["Year", "2022"],
      ["Role", "Solo"],
      ["Location", "Xiong'an, CN"],
    ],
    pages: ["16", "17", "18", "19", "20", "21"],
  },
  baishizhou: {
    index: "04",
    category: "Urban Design / Regeneration",
    title: "白石洲 · 再生",
    chineseTitle: "后疫情时代下白石洲地区改造设计",
    year: "2020",
    location: "广东深圳 / Shenzhen",
    role: "CBDA 优秀奖 / 合作完成",
    description:
      "以多层公共空间、连续步行系统和弹性生活单元回应高密度城中村更新，讨论城市韧性、社区连接与个体自由之间的平衡。方案把公共空间的再生视为基础设施，而不只是景观结果。",
    facts: [
      ["Type", "Urban Design"],
      ["Year", "2020"],
      ["Award", "CBDA"],
      ["Location", "Shenzhen, CN"],
    ],
    pages: ["22", "23", "24", "25"],
  },
  guangyang: {
    index: "05",
    category: "Adaptive Reuse / Landscape",
    title: "山隐川韵",
    chineseTitle: "重庆广阳岛油库湾改造",
    year: "2024",
    location: "重庆 / Chongqing",
    role: "匠作奖优胜奖 / 独立方案与图纸、合作模型",
    description:
      "保留旧油库的结构逻辑和工业尺度，以新旧叠合、通透材料与山地景观重组一段沿江公共路径。项目在工业遗存、自然恢复和公众游憩之间建立新的空间关系。",
    facts: [
      ["Type", "Adaptive Reuse"],
      ["Year", "2024"],
      ["Award", "Craft Award"],
      ["Location", "Chongqing, CN"],
    ],
    pages: ["26", "27", "28", "29"],
  },
};

const projectOrder = Object.keys(projects);

const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const projectDialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogIndex = document.querySelector("#dialog-index");
const dialogCategory = document.querySelector("#dialog-category");
const dialogClose = document.querySelector("#dialog-close");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");
const progressBar = document.querySelector("#page-progress-bar");

let activeProject = null;

function renderProject(projectKey) {
  const project = projects[projectKey];
  if (!project) return;

  activeProject = projectKey;
  dialogIndex.textContent = `${project.index} / 05`;
  dialogCategory.textContent = project.category;

  const facts = project.facts
    .map(
      ([label, value]) => `
        <div>
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>
      `,
    )
    .join("");

  const spreads = project.pages
    .map(
      (pageNumber) => `
        <button
          class="spread"
          type="button"
          data-src="assets/pages/page-${pageNumber}.jpg"
          aria-label="放大查看${project.chineseTitle}第 ${pageNumber} 页"
        >
          <img
            src="assets/pages/page-${pageNumber}.jpg"
            alt="${project.chineseTitle}作品集第 ${pageNumber} 页"
            loading="lazy"
            decoding="async"
          />
        </button>
      `,
    )
    .join("");

  const currentIndex = projectOrder.indexOf(projectKey);
  const nextKey = projectOrder[(currentIndex + 1) % projectOrder.length];
  const nextProject = projects[nextKey];

  dialogContent.innerHTML = `
    <section class="dialog-intro">
      <div class="dialog-number">${project.index}</div>
      <div class="dialog-title">
        <kbd>${project.category}</kbd>
        <h2>${project.title}</h2>
        <h3>${project.chineseTitle}</h3>
      </div>
    </section>

    <section class="dialog-description">
      <p>${project.description}</p>
      <dl class="dialog-facts">
        ${facts}
      </dl>
    </section>

    <section class="dialog-gallery" aria-label="${project.chineseTitle}图纸与过程">
      ${spreads}
    </section>

    <footer class="dialog-footer">
      <div>
        <span class="section-rail">
          <span>${project.year}</span>
          <p>${project.location}</p>
        </span>
      </div>
      <button class="next-project" type="button" data-next="${nextKey}">
        <span>Next / ${nextProject.index}</span>
        <strong>${nextProject.title}</strong>
      </button>
    </footer>
  `;

  projectDialog.scrollTop = 0;
}

function openProject(projectKey) {
  renderProject(projectKey);
  if (!projectDialog.open) {
    projectDialog.showModal();
  }
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => dialogClose.focus());
}

function closeProject() {
  if (projectDialog.open) {
    projectDialog.close();
  }
  document.body.classList.toggle("modal-open", lightbox.open);
}

function openLightbox(src, alt = "") {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  if (!lightbox.open) {
    lightbox.showModal();
  }
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => lightboxClose.focus());
}

function closeLightbox() {
  if (lightbox.open) {
    lightbox.close();
  }
  lightboxImage.src = "";
  document.body.classList.toggle("modal-open", projectDialog.open);
}

function handleDialogBackdrop(event) {
  if (event.target !== event.currentTarget) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const isInside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (!isInside) {
    event.currentTarget.close();
  }
}

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

dialogClose.addEventListener("click", closeProject);
lightboxClose.addEventListener("click", closeLightbox);

projectDialog.addEventListener("close", () => {
  document.body.classList.toggle("modal-open", lightbox.open);
});

lightbox.addEventListener("close", () => {
  document.body.classList.toggle("modal-open", projectDialog.open);
});

projectDialog.addEventListener("click", handleDialogBackdrop);
lightbox.addEventListener("click", handleDialogBackdrop);

document.addEventListener("click", (event) => {
  const nextButton = event.target.closest("[data-next]");
  if (nextButton) {
    renderProject(nextButton.dataset.next);
    return;
  }

  const spread = event.target.closest(".spread");
  if (spread) {
    const image = spread.querySelector("img");
    openLightbox(spread.dataset.src, image ? image.alt : "");
    return;
  }

  const lightboxTrigger = event.target.closest(".lightbox-trigger");
  if (lightboxTrigger) {
    const image = lightboxTrigger.querySelector("img");
    openLightbox(lightboxTrigger.dataset.src, image ? image.alt : "");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
  document.body.classList.toggle("menu-open", isOpen);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "打开导航");
    document.body.classList.remove("menu-open");
  });
});

let latestScrollY = 0;
let progressFrame = null;

function updateScrollState() {
  latestScrollY = window.scrollY;
  header.classList.toggle("is-scrolled", latestScrollY > 42);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(latestScrollY / maxScroll, 1) : 0;
  progressBar.style.width = `${progress * 100}%`;
  progressFrame = null;
}

window.addEventListener(
  "scroll",
  () => {
    if (progressFrame !== null) return;
    progressFrame = requestAnimationFrame(updateScrollState);
  },
  { passive: true },
);

window.addEventListener("resize", updateScrollState);
updateScrollState();

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -9% 0px",
      threshold: 0.08,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
