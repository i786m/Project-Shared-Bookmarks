import { getUserIds } from './storage.mjs';

function displayUserIds() {
	const users = getUserIds();
	const userSelector = document.getElementById('user-select');

	userSelector.innerHTML = '';

	if (!users || users.length === 0) {
		const noUsersOption = document.createElement('option');
		noUsersOption.textContent = 'No users available';
		noUsersOption.disabled = true;
		noUsersOption.selected = true;
		userSelector.appendChild(noUsersOption);
		userSelector.disabled = true;
		return;
	} else {
		userSelector.disabled = false;
	}

	const defaultOption = document.createElement('option');
	defaultOption.textContent = 'Select a user';
	defaultOption.selected = true;
	defaultOption.disabled = true;

	const userOptions = users.map((id) => {
		const option = document.createElement('option');
		option.textContent = `User ${id}`;
		option.value = id;
		return option;
	});

	const options = [defaultOption, ...userOptions];

	options.forEach((option) => {
		userSelector.appendChild(option);
	});
}

function setupListeners() {
	const userSelector = document.getElementById('user-select');

	userSelector.addEventListener('change', (event) => {
		const selectedUserId = event.target.value;
		console.log(`Selected user id: ${selectedUserId}`);
		// You can add additional logic here to handle the selected user id
	});
}

window.onload = function () {
	displayUserIds();
	setupListeners();
};
