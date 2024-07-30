// app/javascript/packs/application.js
import 'bootstrap';
import '../stylesheets/application';
import { Turbo } from "@hotwired/turbo-rails";
import Rails from '@rails/ujs';
import * as ActiveStorage from '@rails/activestorage';
import $ from 'jquery';
import 'channels';
window.$ = $;
window.jQuery = $;
Rails.start();
ActiveStorage.start();

