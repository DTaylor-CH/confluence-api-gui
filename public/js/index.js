function onSubmit(event, postId) {
  event.preventDefault();
  const formElements = document.getElementsByClassName(
    "categories-form-fields"
  );
  let checkedFormValues = [];

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].checked) {
      checkedFormValues.push(formElements[i].name);
    }
  }

  fetch("/submit", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, tags: checkedFormValues }),
  }).then(() => {
    window.location = `/`;
  });
}
