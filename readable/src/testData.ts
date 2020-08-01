import { PostState } from './store/postSlice';
import { CategoryState } from './store/categorySlice';
import { CommentState } from './store/commentSlice';

export const testPosts: PostState = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0,
  },
  '7ni6ok3ym7mf1p33lnez': {
    id: '7ni6ok3ym7mf1p33lnez',
    timestamp: 1468479867190,
    title:
      'Lorem anim dolor duis ea et culpa. Veniam incididunt tempor duis veniam deserunt aliquip officia irure amet fugiat incididunt. Aliquip mollit minim cillum incididunt. Non occaecat magna et minim nostrud pariatur Lorem. Labore nulla eu voluptate nostrud sit exercitation enim commodo esse sit incididunt cupidatat aliquip. Cillum nulla elit laboris sit nisi anim amet est.',
    body:
      'Officia velit dolore pariatur non. Sunt commodo laborum occaecat voluptate excepteur proident deserunt laborum aliquip occaecat. Eiusmod aliquip reprehenderit amet excepteur commodo incididunt tempor aute tempor. Ullamco do mollit cupidatat excepteur dolore. Incididunt ullamco aute ullamco veniam est voluptate dolore pariatur laboris. Sit amet dolor dolore proident ipsum. Ea sit amet in occaecat.Commodo aliqua in id aliqua cupidatat id nostrud proident adipisicing deserunt ea occaecat reprehenderit qui. Aute id cupidatat magna dolore duis incididunt minim. Ullamco exercitation consectetur officia dolor sit fugiat ea ut. Excepteur laborum aute laboris non excepteur deserunt eiusmod nisi nisi veniam. Laboris reprehenderit culpa ad incididunt dolor deserunt amet labore officia et.Sint ex dolor id minim nulla occaecat in cupidatat aute culpa fugiat minim laboris. Aliqua consequat pariatur nisi aliquip aliquip duis anim qui pariatur nostrud aliquip ullamco enim. Quis exercitation mollit sunt ipsum deserunt. Mollit laborum deserunt sit consequat pariatur.',
    author: 'thingone',
    category: 'udacity',
    voteScore: 0,
    deleted: false,
    commentCount: 0,
  },
};

export const testCategories: CategoryState = [
  {
    name: 'React',
    path: 'react',
  },
  {
    name: 'Redux',
    path: 'redux',
  },
  {
    name: 'Udacity',
    path: 'udacity',
  },
];

export const testComments: CommentState = {
  '894tuq4ut84ut8v4t8wun89g': {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false,
  },
  '8tu4bsun805n8un48ve89': {
    id: '8tu4bsun805n8un48ve89',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false,
  },
};
