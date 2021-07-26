const form = document.getElementById('id_ser');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { search, method } = event.target;
  // console.log(name.value, password.value, action, method);
  // console.log(search.value);
  const response = await fetch(`/main/search`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: search.value }),
  });
  console.log(response);
  const result = await response.json();
  console.log(result);
  window.location.href=`info/${result._id}`;
});
