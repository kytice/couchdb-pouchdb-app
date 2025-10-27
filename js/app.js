const localDB = new PouchDB("ev_local");
const localCouchDB = new PouchDB(CONFIG.COUCHDB_URL);
const cloudantDB = new PouchDB(CONFIG.CLOUDANT_URL, {
  fetch: function (url, opts) {
    opts.headers.set("Authorization", "Bearer " + CONFIG.CLOUDANT_BEARER_TOKEN);
    return PouchDB.fetch(url, opts);
  },
});

// THREE-WAY SYNC
localDB.sync(localCouchDB, { live: true, retry: true });
localDB
  .sync(cloudantDB, { live: true, retry: true })
  .on("change", loadVehicles);

// CREATE / UPDATE
document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();

  const vehicle = {
    _id: document.getElementById("id").value || "vehicle_" + Date.now(),
    Manufacturer: document.getElementById("manufacturer").value,
    Model: document.getElementById("model").value,
    Year: parseInt(document.getElementById("year").value),
    Price_USD: parseFloat(document.getElementById("price").value),
  };

  const rev = document.getElementById("rev").value;
  if (rev) vehicle._rev = rev;

  await localDB.put(vehicle);
  cancel();
  loadVehicles();
};

// READ (latest 20)
async function loadVehicles() {
  const result = await localDB.allDocs({
    include_docs: true,
    descending: true,
    limit: 20,
  });

  document.getElementById("list").innerHTML = result.rows
    .map((row) => {
      const v = row.doc;
      return `
      <tr>
        <td>${v.Manufacturer}</td>
        <td>${v.Model}</td>
        <td>${v.Year}</td>
        <td>$${v.Price_USD?.toLocaleString()}</td>
        <td>
          <button onclick='edit(${JSON.stringify(v)})'>Edit</button>
          <button onclick="del('${v._id}', '${v._rev}')">Delete</button>
        </td>
      </tr>
    `;
    })
    .join("");
}

// UPDATE
function edit(v) {
  document.getElementById("id").value = v._id;
  document.getElementById("rev").value = v._rev;
  document.getElementById("manufacturer").value = v.Manufacturer;
  document.getElementById("model").value = v.Model;
  document.getElementById("year").value = v.Year;
  document.getElementById("price").value = v.Price_USD;
  window.scrollTo(0, 0);
}

// DELETE
async function del(id, rev) {
  if (confirm("Delete?")) {
    await localDB.remove(id, rev);
    loadVehicles();
  }
}

function cancel() {
  document.getElementById("form").reset();
  document.getElementById("id").value = "";
  document.getElementById("rev").value = "";
}

loadVehicles();
