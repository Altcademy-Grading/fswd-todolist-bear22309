// app/javascript/packs/application.js
import 'bootstrap';
import '../stylesheets/application';
import { Turbo } from "@hotwired/turbo-rails";
import Rails from '@rails/ujs';
import * as ActiveStorage from '@rails/activestorage';
import $ from 'jquery';
import 'channels';

import Vue from 'vue';
import App from '../app.vue';

window.$ = $;
window.jQuery = $;
window.Turbo = Turbo;

Rails.start();
ActiveStorage.start();

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)
})
