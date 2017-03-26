'use strict';

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();
const nunjucks = require('nunjucks');
const Mus = require('../lib');
const mus = new Mus({
  baseDir: 'test/template',
});
nunjucks.configure('test/template', { autoescape: true });

const obj = {
  test: '123',
  html: '<div>123\n321</div>',
  list: [
    {
      url: 'http://baidu.com',
      name: 'test',
      show: false,
      subjects: [
        {
          subName: 'subjects1'
        },
        {
          subName: 'subjects2'
        },
      ]
    },
    {
      name: 'test2',
      show: true,
    }
  ]
};

suite
  .add('Mus#renderExtend', function() {
    mus.render('test5.tpl', obj);
  })
  .add('Nunjucks#renderExtend', function() {
    nunjucks.render('test5.tpl', obj);
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run();
