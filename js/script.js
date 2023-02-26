const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const toggleLoader = () => {
  const loader = document.querySelector('#loader');
  loader.hasAttribute('hidden') ? loader.removeAttribute('hidden') : loader.setAttribute('hidden', '');
};

const createUserRecord = (name = '') => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.setAttribute('href', '!#');
  a.textContent = name;
  const userRecord = li.appendChild(a);
  return userRecord;
};

const createUserList = (users = []) => {
  const listWrapper = document.querySelector('#data-container');
  for (const user of users) {
    const newRecord = createUserRecord(user.name);
    listWrapper.append(newRecord);
  }
};

const getUsersByIds = (idList = []) => {
  toggleLoader();

  const requests = idList.map((id) => fetch(`${USERS_URL}/${id}`));

  Promise.all(requests)
    .then((responses) => {
      const userPromises = responses.map((response) => response.json());
      return Promise.all(userPromises);
    })
    .then((users) => createUserList(users))
    .catch((error) => console.error(error))
    .finally(() => {
      toggleLoader();
    });
};

getUsersByIds([5, 6, 2, 1]);
