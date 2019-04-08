import {auth} from "./request";

test('auth success', ()=>{
  let authed = auth('admin','admin');
  expect(authed).toBeTruthy();
});

test('auth error', ()=>{
  let authed = auth('admin','ad');
  expect(authed).toBeFalsy();
});