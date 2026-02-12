// mock localStorage for Node.js
global.localStorage = {
	_store: {},
	getItem(key) {
		return this._store[key] || null;
	},
	setItem(key, value) {
		this._store[key] = value;
	},
	removeItem(key) {
		delete this._store[key];
	},
};

import assert from 'node:assert';
import test, { beforeEach } from 'node:test';
import { getData, setData, clearData, getUserIds } from '../storage.mjs';
import { getSortedBookmarks } from '../script.mjs';

//ensure that localStorage is cleared before each test
beforeEach(() => {
	global.localStorage._store = {};
});

test('there are 5 users', () => {
	assert.equal(getUserIds().length, 5);
});

test('user IDs are correct', () => {
	const expectedUserIds = ['1', '2', '3', '4', '5'];
	assert.deepEqual(getUserIds(), expectedUserIds);
});

test('stored bookmark object contains correct properties and values', () => {
	const bookmark = {
		url: 'https://www.test.com/1',
		title: 'test 1',
		description: 'first bookmark',
		likes: 0,
		timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
	};
	setData('1', [bookmark]);
	const data = getSortedBookmarks('1')[0];
	assert.ok(data.hasOwnProperty('url'));
	assert.ok(data.hasOwnProperty('title'));
	assert.ok(data.hasOwnProperty('description'));
	assert.ok(data.hasOwnProperty('likes'));
	assert.ok(data.hasOwnProperty('timestamp'));
	assert.equal(data.url, bookmark.url);
	assert.equal(data.title, bookmark.title);
	assert.equal(data.description, bookmark.description);
	assert.equal(data.likes, bookmark.likes);
	assert.equal(data.timestamp, bookmark.timestamp);
});

test('getSortedBookmarks returns only bookmarks for selected user', () => {
	setData('1', [
		{
			url: 'https://www.test.com/1',
			title: 'test 1',
			description: 'first bookmark',
			likes: 0,
			timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
		},
	]);
	setData('2', [
		{
			url: 'https://www.test.com/2',
			title: 'test 2',
			description: 'second bookmark',
			likes: 10,
			timestamp: new Date('2026-01-02T10:00:00').toLocaleString(),
		},
	]);
	const user1Bookmarks = getSortedBookmarks('1');
	const user2Bookmarks = getSortedBookmarks('2');
	assert.equal(user1Bookmarks.length, 1);
	assert.equal(user2Bookmarks.length, 1);
	assert.notDeepEqual(user1Bookmarks, user2Bookmarks);
});

test('adding a bookmark for one user does not affect others', () => {
	clearData('1');
	clearData('2');	
	setData('1', [
		{
			url: 'https://www.test.com/1',
			title: 'test 1',
			description: 'first bookmark',
			likes: 0,
			timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
		},
	]);
	assert.deepEqual(getSortedBookmarks('2'), []);
});

test('getSortedBookmarks returns updated list after adding bookmark', () => {
	clearData('3');
	const newBookmark = {
		url: 'https://www.test.com/3',
		title: 'test 3',
		description: 'third bookmark',
		likes: 5,
		timestamp: new Date('2026-01-03T10:00:00').toLocaleString(),
	};
	setData('3', [newBookmark]);
	const updatedBookmarks = getSortedBookmarks('3');
	assert.deepEqual(updatedBookmarks[0], newBookmark);
});

test('likes are correctly updated and persisted', () => {
	const bookmark = {
		url: 'https://www.test.com/1',
		title: 'test 1',
		description: 'first bookmark',
		likes: 0,
		timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
	};
	setData('1', [bookmark]);
	const data = getSortedBookmarks('1');
	data[0].likes += 1;
	setData('1', data);
	const updated = getSortedBookmarks('1');
	assert.equal(updated[0].likes, 1);
});

test('liking one bookmark does not affect another', () => {
	const bookmarks = [
		{
			url: 'https://www.test.com/1',
			title: 'test 1',
			description: 'first bookmark',
			likes: 0,
			timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
		},
		{
			url: 'https://www.test.com/2',
			title: 'test 2',
			description: 'second bookmark',
			likes: 10,
			timestamp: new Date('2026-01-02T10:00:00').toLocaleString(),
		},
	];
	setData('1', bookmarks);
	const data = getSortedBookmarks('1');
	data[0].likes += 1;
	setData('1', data);
	const updated = getSortedBookmarks('1');
	assert.equal(updated[0].likes, 11);
	assert.equal(updated[1].likes, 0);
});

test('bookmarks are sorted in reverse chronological order for three bookmarks', () => {
	const userId = '1';
	const bookmarks = [
		{
			url: 'https://www.test.com/1',
			title: 'test 1',
			description: 'first bookmark',
			likes: 0,
			timestamp: new Date('2026-01-01T10:00:00').toLocaleString(),
		},
		{
			url: 'https://www.test.com/2',
			title: 'test 2',
			description: 'second bookmark',
			likes: 10,
			timestamp: new Date('2026-01-02T10:00:00').toLocaleString(),
		},
		{
			url: 'https://www.test.com/3',
			title: 'test 3',
			description: 'third bookmark',
			likes: 5,
			timestamp: new Date('2026-01-03T10:00:00').toLocaleString(),
		},
	];
	setData(userId, bookmarks);
	const sorted = getSortedBookmarks(userId);
	assert.equal(sorted[0].title, 'test 3');
	assert.equal(sorted[1].title, 'test 2');
	assert.equal(sorted[2].title, 'test 1');
});

test('getSortedBookmarks returns empty for user with no bookmarks', () => {
	clearData('4');
	assert.deepEqual(getSortedBookmarks('4'), []);
});