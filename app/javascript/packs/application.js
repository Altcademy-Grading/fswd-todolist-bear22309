// Import Rails, Turbolinks, and ActiveStorage
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"

// Import Bootstrap and jQuery
import "bootstrap/dist/js/bootstrap.bundle"
import $ from 'jquery'

// Make jQuery globally available
window.$ = $
window.jQuery = $

import "channels"

// Initialize Rails, Turbolinks, and ActiveStorage
Rails.start()
Turbolinks.start()
ActiveStorage.start()

