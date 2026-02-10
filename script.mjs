import { getUserIds, getData, setData } from './storage.mjs';

function populateUserSelector() {
	const users = getUserIds();
	const userSelector = document.getElementById('user-select');

	userSelector.innerHTML = '';

	const defaultOption = document.createElement('option');
	defaultOption.textContent = 'Select a user';
	defaultOption.selected = true;
	defaultOption.disabled = true;
	userSelector.appendChild(defaultOption);

	users.forEach(user => {
		const option = document.createElement('option');
		option.value = user;
		option.textContent = `User ${user}`;
		userSelector.appendChild(option);
	});
}

function displayBookmarks () {
	const selectedUser   = document.getElementById('user-select');
	const bookmarkList   = document.getElementById("bookmark-list");
	const existData 	   = getData(selectedUser.value)
	
	bookmarkList.innerHTML = "";

	if( existData && existData.length > 0 ) {
		[...existData].reverse().forEach((bookmarkData) => {
			const listItem = document.createElement("li");
			
			listItem.innerHTML = `
				<div class="bookmark-list-item" >
					<a href="${bookmarkData.url}" target="_blank">
					${bookmarkData.title}
					</a>
					<p> ${bookmarkData.description} </p>
					<button class="like-bookmark" type="button" > Likes ${bookmarkData.likes} </button>
					<button class="copy-link" type= "button" > Copy Link </button>
					<p id="bookmark-timestamp"> ${bookmarkData.timestamp}</p>
				</div>
			`
			
			bookmarkList.appendChild(listItem);

			// add event listener to like the bookmark and count the likes
        		const likesBookmark = listItem.querySelector(".like-bookmark");
			likesBookmark.addEventListener('click', function() {
				bookmarkData.likes += 1

				setData(selectedUser.value, existData);
				selectedUser.dispatchEvent(new Event('change'));
			});

			// add copy link button for each bookmark, implement copy-to-clipboard 
        		const copyLinkBtn = listItem.querySelector(".copy-link");
			copyLinkBtn.addEventListener("click", function() {
				navigator.clipboard.writeText(bookmarkData.url);
          			copyLinkBtn.textContent = "Copied!";

				setTimeout(() => {
					copyLinkBtn.textContent = "Copy Link";
				}, 1000);
			});
		});
	
	} else {
		const noData = document.createElement("div")
      	noData.innerHTML = `
			<h3> There are no bookmarks for this user yet...!!</h3>
            `

      	bookmarkList.appendChild(noData);
	}

}

window.onload = function () {
	populateUserSelector();
	displayBookmarks();
};
