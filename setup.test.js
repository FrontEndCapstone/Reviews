const { expect } = require('chai');
const React = require('react');
const { mount } = require('enzyme');

const Test = <div>React_test_div</div>;

it('should pass a truthy test', () => {
  expect(true).to.equal(true);
});

it('should test a React component', () => {
  const w = mount(Test);
  expect(w.text()).to.equal('React_test_div');
});
