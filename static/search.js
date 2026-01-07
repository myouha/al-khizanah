let fuse;
let data = [];

fetch("/index.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    fuse = new Fuse(data, {
      includeScore: true,
      threshold: 0.3,
      keys: [
        "title",
        "tags",
        "chapters"
      ]
    });
  });

const input = document.getElementById("search");
const results = document.getElementById("results");

input.addEventListener("input", function () {
  const query = this.value.trim();

  if (!query) {
    results.innerHTML = data.map(item => `
      <li>
        <a href="${item.url}">
          الموسم ${item.season} · الحلقة ${item.episode} — ${item.title}
        </a>
      </li>
    `).join("");
    return;
  }

  const matches = fuse.search(query);

  results.innerHTML = matches.map(({ item }) => `
    <li>
      <a href="${item.url}">
        الموسم ${item.season} · الحلقة ${item.episode} — ${item.title}
      </a>
    </li>
  `).join("");
});