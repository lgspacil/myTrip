webpackJsonp([1],{

/***/ "../../../../../../node_modules/angular2-cookie/services/base-cookie-options.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
/** @private */
var CookieOptions = (function () {
    function CookieOptions(_a) {
        var _b = _a === void 0 ? {} : _a, path = _b.path, domain = _b.domain, expires = _b.expires, secure = _b.secure;
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : null;
        this.secure = this.isPresent(secure) ? secure : false;
    }
    CookieOptions.prototype.merge = function (options) {
        return new CookieOptions({
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                this.secure,
        });
    };
    CookieOptions.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    return CookieOptions;
}());
exports.CookieOptions = CookieOptions;
/** @private */
var BaseCookieOptions = (function (_super) {
    __extends(BaseCookieOptions, _super);
    function BaseCookieOptions(baseHref) {
        _super.call(this, { path: baseHref || '/' });
        this.baseHref = baseHref;
    }
    BaseCookieOptions = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()),
        __param(0, core_1.Inject(common_1.APP_BASE_HREF)), 
        __metadata('design:paramtypes', [String])
    ], BaseCookieOptions);
    return BaseCookieOptions;
}(CookieOptions));
exports.BaseCookieOptions = BaseCookieOptions;



/***/ }),

/***/ "../../../../../../node_modules/angular2-cookie/services/cookies.service.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * angular2-cookie - Implementation of Angular 1.x $cookies service to Angular 2
 * @version v1.2.6
 * @link https://github.com/salemdar/angular2-cookie#readme
 * @license MIT
 */

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var base_cookie_options_1 = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/base-cookie-options.js");
var CookieService = (function () {
    function CookieService(_defaultOptions) {
        this._defaultOptions = _defaultOptions;
    }
    Object.defineProperty(CookieService.prototype, "cookieString", {
        get: function () {
            return document.cookie || '';
        },
        set: function (val) {
            document.cookie = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @name CookieService#get
     *
     * @description
     * Returns the value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {string} Raw cookie value.
     */
    CookieService.prototype.get = function (key) {
        return this._cookieReader()[key];
    };
    /**
     * @name CookieService#getObject
     *
     * @description
     * Returns the deserialized value of given cookie key.
     *
     * @param {string} key Id to use for lookup.
     * @returns {Object} Deserialized cookie value.
     */
    CookieService.prototype.getObject = function (key) {
        var value = this.get(key);
        return value ? JSON.parse(value) : value;
    };
    /**
     * @name CookieService#getAll
     *
     * @description
     * Returns a key value object with all the cookies.
     *
     * @returns {Object} All cookies
     */
    CookieService.prototype.getAll = function () {
        return this._cookieReader();
    };
    /**
     * @name CookieService#put
     *
     * @description
     * Sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {string} value Raw value to be stored.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.put = function (key, value, options) {
        this._cookieWriter()(key, value, options);
    };
    /**
     * @name CookieService#putObject
     *
     * @description
     * Serializes and sets a value for given cookie key.
     *
     * @param {string} key Id for the `value`.
     * @param {Object} value Value to be stored.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.putObject = function (key, value, options) {
        this.put(key, JSON.stringify(value), options);
    };
    /**
     * @name CookieService#remove
     *
     * @description
     * Remove given cookie.
     *
     * @param {string} key Id of the key-value pair to delete.
     * @param {CookieOptionsArgs} options (Optional) Options object.
     */
    CookieService.prototype.remove = function (key, options) {
        this._cookieWriter()(key, undefined, options);
    };
    /**
     * @name CookieService#removeAll
     *
     * @description
     * Remove all cookies.
     */
    CookieService.prototype.removeAll = function () {
        var _this = this;
        var cookies = this.getAll();
        Object.keys(cookies).forEach(function (key) {
            _this.remove(key);
        });
    };
    CookieService.prototype._cookieReader = function () {
        var lastCookies = {};
        var lastCookieString = '';
        var that = this;
        var cookieArray, cookie, i, index, name;
        var currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));
                    // the first value that is seen for a cookie is the most
                    // specific one.  values for the same cookie name that
                    // follow are for less specific paths.
                    if (this.isBlank(lastCookies[name])) {
                        lastCookies[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    };
    CookieService.prototype._cookieWriter = function () {
        var that = this;
        return function (name, value, options) {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    };
    CookieService.prototype._safeDecodeURIComponent = function (str) {
        try {
            return decodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    };
    CookieService.prototype._buildCookieString = function (name, value, options) {
        var cookiePath = '/';
        var path, expires;
        var defaultOpts = this._defaultOptions || new base_cookie_options_1.CookieOptions({ path: cookiePath });
        var opts = this._mergeOptions(defaultOpts, options);
        expires = opts.expires;
        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (this.isString(expires)) {
            expires = new Date(expires);
        }
        var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';
        // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
        // - 300 cookies
        // - 20 cookies per unique domain
        // - 4096 bytes per cookie
        var cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log("Cookie '" + name + "' possibly not set or overflowed because it was too \n      large (" + cookieLength + " > 4096 bytes)!");
        }
        return str;
    };
    CookieService.prototype._mergeOptions = function (defaultOpts, providedOpts) {
        var newOpts = defaultOpts;
        if (this.isPresent(providedOpts)) {
            return newOpts.merge(new base_cookie_options_1.CookieOptions(providedOpts));
        }
        return newOpts;
    };
    CookieService.prototype.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    CookieService.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    CookieService.prototype.isString = function (obj) {
        return typeof obj === 'string';
    };
    CookieService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [base_cookie_options_1.CookieOptions])
    ], CookieService);
    return CookieService;
}());
exports.CookieService = CookieService;



/***/ }),

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    // {
    //   path: '',
    //   children: []
    // },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2_app_app_component__["a" /* AppComponent */] },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "agm-map {\n  height: 300px;\n}\n\n.red{\n  color: red;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"login == true\" class=\"login-wrapper\">\n  \n  <form class=\"form-horizontal\" #logForm='ngForm'>\n      <button style=\"text-align:right;float:right;\" class=\"btn btn-danger btn-sm\" (click)=\"switchToRegister()\">Not a User? Register Here!</button>\n    <fieldset>\n      <legend>Login</legend>\n      <div class=\"form-group\">\n        <label for=\"inputEmail\" class=\"col-lg-1 control-label\">Email</label>\n        <div class=\"col-lg-10\">\n          <input \n          type=\"text\" \n          class=\"form-control\" \n          name=\"email\" \n          placeholder=\"Email\" \n          required \n          minlength=\"6\" \n          [(ngModel)]=\"user_obj.email\" \n          #email=\"ngModel\">\n        </div>\n      </div>\n\n      <div class=\"red\" *ngIf='email.errors && (email.touched)'>\n        <p *ngIf='email.errors.required'>Email is required</p>\n        <p *ngIf='email.errors.minlength'>Email must contain at least 6 characters.</p>\n      </div>\n\n\n      <div class=\"form-group\">\n        <label for=\"inputPassword\" class=\"col-lg-1 control-label\">Password</label>\n        <div class=\"col-lg-10\">\n          <input \n          type=\"password\" \n          class=\"form-control\" \n          name=\"password\" \n          placeholder=\"Password\" \n          required\n          minlength=\"4\"\n          [(ngModel)]=\"user_obj.password\"\n          #password=\"ngModel\">\n        </div>\n      </div>\n\n      <div class=\"red\" *ngIf='password.errors && (password.touched)'>\n        <p *ngIf='password.errors.required'>Password is required</p>\n        <p *ngIf='password.errors.minlength'>Password must be at least 4 characters.</p>\n      </div>\n      \n      <div class=\"form-group\">\n        <div class=\"col-lg-10 col-lg-offset-2\">\n          <button type=\"reset\" class=\"btn btn-default\">Cancel</button>\n          <button [disabled]=\"!logForm.valid\" type=\"submit\" class=\"btn btn-primary\" (click)=\"userLogin()\">Submit</button>\n        </div>\n      </div>\n\n    </fieldset>\n  </form>\n\n  <div *ngIf=\"error\">\n    <p class=\"red\">{{error}}</p>\n  </div>\n\n</div> <!--end of the login wrapper-->\n\n<!--*********************************************************************************************-->\n<!--*********************************************************************************************-->\n<!--*********************************************************************************************-->\n\n<div class=\"reg_wrapper\" *ngIf=\"register == true\">  \n  <form class=\"form-horizontal\" #regForm='ngForm'>\n    <button style=\"text-align:right;float:right;\" class=\"btn btn-danger btn-sm\" (click)=\"switchToLogin()\">Back to Login Page</button>\n    <fieldset>\n      <legend>Register</legend>\n      <div class=\"form-group\">\n        <label for=\"inputEmail\" class=\"col-lg-1 control-label\">Email</label>\n        <div class=\"col-lg-10\">\n          <input \n          type=\"text\" \n          class=\"form-control\" \n          name=\"email\" \n          required\n          minlength=\"6\" \n          placeholder=\"Email\" \n          [(ngModel)]=\"user_obj.email\"\n          #email = 'ngModel'>\n        </div>\n      </div>\n\n      <div class=\"red\" *ngIf='email.errors && (email.touched)'>\n        <p *ngIf='email.errors.required'>Email is required</p>\n        <p *ngIf='email.errors.minlength'>Email must contain at least 6 characters.</p>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"inputEmail\" class=\"col-lg-1 control-label\">User Name</label>\n        <div class=\"col-lg-10\">\n          <input type=\"text\" \n          class=\"form-control\" \n          name=\"username\" \n          placeholder=\"Username\" \n          required\n          minlength=\"3\"\n          [(ngModel)]=\"user_obj.username\"\n          #username='ngModel'>\n        </div>\n      </div>\n\n      <div class=\"red\" *ngIf='username.errors && (username.touched)'>\n        <p *ngIf='username.errors.required'>Username is required</p>\n        <p *ngIf='username.errors.minlength'>username must contain at least 3 characters.</p>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"inputPassword\" class=\"col-lg-1 control-label\">Password</label>\n        <div class=\"col-lg-10\">\n          <input \n          type=\"password\" \n          class=\"form-control\" \n          name=\"password\" \n          placeholder=\"Password\" \n          required\n          minlength=\"4\"\n          [(ngModel)]=\"user_obj.password\"\n          #password='ngModel'>\n        </div>\n      </div>\n\n      <div class=\"red\" *ngIf='password.errors && (password.touched)'>\n        <p *ngIf='password.errors.required'>Password is required</p>\n        <p *ngIf='password.errors.minlength'>Password must contain at least 4 characters.</p>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"inputPassword\" class=\"col-lg-1 control-label\">Confirm Password</label>\n        <div class=\"col-lg-10\">\n          <input type=\"password\" \n          class=\"form-control\" \n          name=\"confirm_password\" \n          placeholder=\"Confirm Password\"\n          required \n          minlength=\"4\"\n          [(ngModel)]=\"user_obj.confirm_password\"\n          #confirm_password=\"ngModel\">\n        </div>\n      </div>\n\n       <div class=\"red\" *ngIf='user_obj.confirm_password != user_obj.password && (confirm_password.touched)'>\n        <p>The passwords do not match!</p>\n      </div>\n      \n      <div class=\"form-group\">\n        <div class=\"col-lg-10 col-lg-offset-2\">\n          <button type=\"reset\" class=\"btn btn-default\">Cancel</button>\n          <button [disabled]=\"!regForm.valid || user_obj.confirm_password != user_obj.password\"  type=\"submit\" class=\"btn btn-primary\" (click)=\"registerUser()\">Submit</button>\n        </div>\n      </div>\n\n\n      <div *ngIf=\"errors\">\n        <p class=\"red\">{{errors}}</p>\n      </div>\n\n    </fieldset>\n  </form>\n</div> <!--end of reg wrapper-->\n\n\n\n\n<app-map (closeMapPage)=\"closeMapPage($event)\" *ngIf=\"show_map == true\"></app-map>\n\n\n\n\n\n  \n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_http_service__ = __webpack_require__("../../../../../src/app/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__ = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(_httpService, _cookieService) {
        this._httpService = _httpService;
        this._cookieService = _cookieService;
        // toggling on off components
        this.login = true;
        this.register = false;
        this.show_map = false;
        this.user_obj = {
            email: '',
            password: '',
        };
        this.error = '';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.userLogin = function () {
        var _this = this;
        this._httpService.userLogin(this.user_obj)
            .then(function (data) {
            if (data == null) {
                console.log("need to register first");
                _this.error = "you have to register if this is your first time here";
            }
            else {
                if (_this.user_obj.password == data.password) {
                    console.log("success for logging in! ", data);
                    _this._cookieService.put('user_name', data.username);
                    _this._cookieService.put('user_id', data._id);
                    //if we get a succesfull log in the login_comp should go away and reveal the map.
                    _this.login = false;
                    _this.show_map = true;
                }
                else {
                    _this.error = "wrong password";
                }
            }
        })
            .catch(function (err) {
            console.log("there was an error when logging in");
        });
    };
    AppComponent.prototype.registerUser = function () {
        var _this = this;
        console.log("submitting the form");
        this._httpService.registerUser(this.user_obj)
            .then(function (data) {
            console.log("hopefully this isnt always false: ", data);
            if (data == false) {
                _this.error = "You have already registered with this email!";
            }
            else {
                console.log("success posted to the DB: ", data);
                //creating a cookie object of the user who logged in
                _this._cookieService.put('user_name', data.username);
                _this._cookieService.put('user_id', data._id);
                //when we successfully register then... we need the register page to go away and have the map appear
                _this.register = false;
                _this.show_map = true;
            }
        })
            .catch(function (err) {
            console.log("something went wrong");
        });
    };
    AppComponent.prototype.switchToRegister = function () {
        this.login = false;
        this.register = true;
    };
    AppComponent.prototype.switchToLogin = function () {
        this.login = true;
        this.register = false;
    };
    AppComponent.prototype.closeMapPage = function (event) {
        if (event == false) {
            this.show_map = false;
        }
        this.login = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_http_service__ = __webpack_require__("../../../../../src/app/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_map_component__ = __webpack_require__("../../../../../src/app/map/map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_cookie_services_cookies_service__ = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angular2_cookie_services_cookies_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__map_view_info_view_info_component__ = __webpack_require__("../../../../../src/app/map/view-info/view-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_map_add_info_add_info_component__ = __webpack_require__("../../../../../src/app/map/add-info/add-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_map_users_trips_users_trips_component__ = __webpack_require__("../../../../../src/app/map/users-trips/users-trips.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__map_map_component__["a" /* MapComponent */],
            __WEBPACK_IMPORTED_MODULE_12_app_map_add_info_add_info_component__["a" /* AddInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_11__map_view_info_view_info_component__["a" /* ViewInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_13_app_map_users_trips_users_trips_component__["a" /* UsersTripsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyD9QqT__lEB5kzYAlfK6HpQEtgOAVijZyk'
            })
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8_app_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_10_angular2_cookie_services_cookies_service__["CookieService"]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HttpService = (function () {
    function HttpService(_http) {
        this._http = _http;
    }
    HttpService.prototype.getLocationName = function (location) {
        return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?&address=" + location).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.registerUser = function (user_obj) {
        return this._http.post("/add_user", user_obj).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.userLogin = function (user_obj) {
        return this._http.post("/log_in", user_obj).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.addLocationToDB = function (marker_obj) {
        return this._http.post("/add_marker", marker_obj).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.loadUserMarkersFromDB = function (user_id) {
        return this._http.post("/load_locations", { user_id: user_id }).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.loadUserMarkersFromDB_Remix = function (event_id) {
        return this._http.post("/load_locations_remix", { user_id: event_id }).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.removeMarker = function (marker) {
        return this._http.post("/remove_marker", marker).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.updateUsersLocations = function (marker) {
        return this._http.post("/update_user_locations", marker).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.updateMarkerInfo = function (info_obj) {
        //console.log("info_obj: ", info_obj);
        return this._http.post("/update_marker", info_obj).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.addDayCountMoneyCountToUser = function (day_money_obj) {
        //console.log("am I getting the day money obj, ", day_money_obj)
        return this._http.post("/update_users_money_day", day_money_obj).map(function (data) { return data.json(); }).toPromise();
    };
    HttpService.prototype.loadUserTrips = function () {
        return this._http.get("/load_trips").map(function (data) { return data.json(); }).toPromise();
    };
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], HttpService);

var _a;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ "../../../../../src/app/map/add-info/add-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".add_info{\n    width: 50%;\n    margin-left: 339px;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/map/add-info/add-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"add_info\">\n  <button class=\"btn btn-danger btn-xs\" (click)=\"closeAddInfoPage()\">X</button>\n  <form class=\"form-horizontal\">\n    <fieldset>\n      <legend>Add Info to Location</legend>\n      <div class=\"form-group\">\n        <label for=\"location_name\" class=\"col-lg-2 control-label\">Location Name</label>\n        <div class=\"col-lg-10\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Paris\" name=\"location_name\" [(ngModel)]=\"updateMarker.location_name\">\n        </div>\n      </div>\n      \n\n      <div class=\"form-group\">\n        <label for=\"textArea\" class=\"col-lg-2 control-label\">A bit about this location..</label>\n        <div class=\"col-lg-10\">\n          <textarea class=\"form-control\" rows=\"3\" id=\"textArea\" placeholder=\"I loved this place! It had the best food!\" name=\"content\" [(ngModel)]=\"updateMarker.content\"></textarea>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"price\" class=\"col-lg-2 control-label\">Price</label>\n        <div class=\"col-lg-10\">\n          <input type=\"number\" class=\"form-control\" placeholder=0 name=\"price\" [(ngModel)]=\"updateMarker.price\">\n        </div>\n      </div>\n\n\n      <div class=\"form-group\">\n        <label for=\"select\" class=\"col-lg-2 control-label\">Marker Image</label>\n        <div class=\"col-lg-10\">\n          <select class=\"form-control\" name=\"img_url\" [(ngModel)]=\"updateMarker.img_url\">\n            <option value=\"https://maps.google.ca/intl/en_ca/mapfiles/icon_green.png\">General Point</option>\n            <option value=\"http://i.imgur.com/0ZTQbec.png\">Airport</option>\n            <option value=\"http://i.imgur.com/0GWhwn8.png\">Camping</option>\n            <option value=\"http://i.imgur.com/E23PQjk.png\">Cool Spot!</option>\n            <option value=\"http://i.imgur.com/3JcS82f.png\">Food</option>\n            <option value=\"http://i.imgur.com/D28Bgeb.png\">Gas Station</option>\n            <option value=\"http://i.imgur.com/1xY4O6T.png\">Grocery Store</option>\n            <option value=\"http://i.imgur.com/jH6JLrm.png\">Hiking</option>\n            <option value=\"http://i.imgur.com/Hkg6fMA.png\">Hotel</option>\n            <option value=\"http://i.imgur.com/fNFwJwJ.png\">Night Life</option>\n            <option value=\"http://i.imgur.com/VAZu2wT.png\">Shopping</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"images\" class=\"col-lg-2 control-label\">Image Upload</label>\n        <div class=\"col-lg-10\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"enter photo url here\" name=\"images\" [(ngModel)]=\"updateMarker.images[0]\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"enter photo url here\" name=\"images\" [(ngModel)]=\"updateMarker.images[1]\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"enter photo url here\" name=\"images\" [(ngModel)]=\"updateMarker.images[2]\">\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"day_number\" class=\"col-lg-2 control-label\">Day Number</label>\n        <div class=\"col-lg-10\">\n          <input type=\"number\" class=\"form-control\" placeholder=0 name=\"day_number\" [(ngModel)]=\"updateMarker.day_number\">\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"trip_location\" class=\"col-lg-2 warning text-warning\">Trip Title.. PLEASE ONLY FILL OUT ONCE FOR FIRST MARKER</label>\n        <div class=\"col-lg-10\">\n          <input type=\"text\" class=\"form-control\" placeholder=\"Trip around Iceland\" name=\"trip_location\" [(ngModel)]=\"updateMarker.trip_location\">\n        </div>\n      </div>\n\n\n      <div class=\"form-group\">\n        <div class=\"col-lg-10 col-lg-offset-2\">\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"submitUpdatedChanges()\">Submit</button>\n        </div>\n      </div>\n    </fieldset>\n  </form>\n\n\n\n\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/map/add-info/add-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_http_service__ = __webpack_require__("../../../../../src/app/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__ = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddInfoComponent = (function () {
    function AddInfoComponent(_httpService, _cookieService) {
        this._httpService = _httpService;
        this._cookieService = _cookieService;
        this.submitChangesClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.closeAddPage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dayNumber = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentCost = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        //user info stored in the cookie:
        this.name = this._cookieService.get('user_name');
        this.user_id = this._cookieService.get('user_id');
        //the markers on the page
        this.markers = [];
    }
    AddInfoComponent.prototype.ngOnInit = function () {
    };
    AddInfoComponent.prototype.submitUpdatedChanges = function () {
        var _this = this;
        this._httpService.updateMarkerInfo(this.updateMarker)
            .then(function (data) {
            console.log("this is the updated info: ", data);
            _this.submitChangesClicked.emit(false);
        })
            .catch(function (err) {
            console.log("yeah.... that didnt work.....");
        });
    };
    AddInfoComponent.prototype.closeAddInfoPage = function () {
        this.closeAddPage.emit(false);
    };
    return AddInfoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], AddInfoComponent.prototype, "updateMarker", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AddInfoComponent.prototype, "submitChangesClicked", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AddInfoComponent.prototype, "closeAddPage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AddInfoComponent.prototype, "dayNumber", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], AddInfoComponent.prototype, "currentCost", void 0);
AddInfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-add-info',
        template: __webpack_require__("../../../../../src/app/map/add-info/add-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/map/add-info/add-info.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"]) === "function" && _b || Object])
], AddInfoComponent);

var _a, _b;
//# sourceMappingURL=add-info.component.js.map

/***/ }),

/***/ "../../../../../src/app/map/map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "agm-map {\n  height: 400px;\n}\n\n.map_key li{\n  display: inline;\n}\n\n.keys{\n  background: #66687e;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/map/map.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\">myTrip</a>\n      <img class=\"navbar-brand\" src=\"http://i.imgur.com/Dti70vY.jpg\">\n    </div>\n    <div id=\"navbar\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li><button class=\"btn btn-info\" (click)=\"showsUsersTrips()\">All Trips</button></li>\n        <li><button class=\"btn btn-danger\" (click)=\"logout()\">LogOut</button></li>\n      </ul>\n    </div><!--/.nav-collapse -->\n  </div>\n</nav>\n\n<div class=\"container\">\n\n  <h1 style=\"text-align:left;float:left;\">Welcome, {{name}}</h1> \n  <h3 style=\"text-align:right;float:right;\">Day Count: {{day_money_obj.day_count}}| Total Cost: ${{day_money_obj.money_count}}</h3> \n  <hr style=\"clear:both;\"/>\n\n  <strong>To add a marker use the search bar below or Right Click the Map!</strong>\n  <div class=\"map\">\n      <!-- this creates a google map on the page with the given lat/lng from -->\n      <!-- the component as the initial center of the map: -->\n      <!--(mapCicked) is when we click the map to add a marker-->\n      <!--markerCLick is adding that marker-->\n      <!--the () means that the html page is listening for these events-->\n      <agm-map \n      [latitude]=\"latitude\" \n      [longitude]=\"longitude\"\n      [zoom]=\"zoom\" \n      [disableDefaultUI]=\"false\"\n      [zoomControl]=\"false\"  \n      (mapRightClick)=\"mapClicked($event)\">\n\n        <agm-polyline [strokeColor]=\"'blue'\">\n          <agm-polyline-point *ngFor=\"let m of markers; let i = index\"\n            [latitude]=\"m.latitude\" \n            [longitude]=\"m.longitude\">\n\n            <agm-marker\n              [iconUrl]=\"m.img_url[0]\"\n              (markerClick)=\"clickedMarker(m, i)\"\n              [latitude]=\"m.latitude\" \n              [longitude]=\"m.longitude\">\n    \n              \n              <agm-info-window>\n                <h4 class=\"text-success\">{{m.location_name}}</h4> \n                <button class=\"btn btn-info\" (click)=\"load_view_info(m)\">Learn More</button>\n                <button class=\"btn btn-success\" (click)=\"load_add_info(m)\" *ngIf=\"user_id == m._user\">Add Info</button>\n                <button class=\"btn btn-danger\" (click)=\"removeMarker(m)\" *ngIf=\"user_id == m._user\">Delete</button>\n                <h6 class=\"text-info\">Day Number: {{m.day_number}}</h6>\n              </agm-info-window>\n\n            </agm-marker>\n\n          </agm-polyline-point>\n\n        </agm-polyline>\n\n\n      </agm-map>  \n  </div>\n\n  <div class=\"keys\">\n    <ul class=\"map_key\">\n      <li>Airport:<img src=\"http://i.imgur.com/0ZTQbec.png\"></li>\n      <li>Camping:<img src=\"http://i.imgur.com/0GWhwn8.png\"></li>\n      <li>Cool Spot!:<img src=\"http://i.imgur.com/E23PQjk.png\"></li>\n      <li>Food:<img src=\"http://i.imgur.com/3JcS82f.png\"></li>\n      <li>Gas Station:<img src=\"http://i.imgur.com/D28Bgeb.png\"></li>\n      <li>General Point:<img src=\"https://maps.google.ca/intl/en_ca/mapfiles/icon_green.png\"></li>\n      <li>Grocery Store:<img src=\"http://i.imgur.com/1xY4O6T.png\"></li>\n      <li>Hiking:<img src=\"http://i.imgur.com/jH6JLrm.png\"></li>\n      <li>Hotel:<img src=\"http://i.imgur.com/Hkg6fMA.png\"></li>\n      <li>Night Life:<img src=\"http://i.imgur.com/fNFwJwJ.png\"></li>\n      <li>Shopping:<img src=\"http://i.imgur.com/VAZu2wT.png\"></li>  \n    </ul>\n  </div>\n\n    <!--form for adding a new marker-->\n    <form>\n      Generate Point: <input type=\"text\" [(ngModel)]=\"markerName\" name=\"markerName\">\n      <button class=\"btn btn-primary\" (click)=\"getLocationName()\">Map it</button>\n    </form>\n\n</div> <!--end of the cointainer tag-->\n\n<app-view-info [displayMarkerInfo]=\"info_for_child_to_display\" (xClicked)=\"closeInfoPage($event)\" *ngIf=\"info_page == true\"></app-view-info>\n\n<app-add-info [updateMarker]=\"add_info_to_marker\" (submitChangesClicked)=\"reloadPage($event)\" (closeAddPage)=\"closeAddPage($event)\" *ngIf=\"add_info_page == true\"></app-add-info>\n\n<app-users-trips (closeUsersPage)=\"closeUsersPage($event)\" (checkOutTrip)=\"checkOutTrip($event)\" *ngIf=\"users_trips_page == true\"></app-users-trips>"

/***/ }),

/***/ "../../../../../src/app/map/map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_http_service__ = __webpack_require__("../../../../../src/app/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__ = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapComponent = (function () {
    function MapComponent(_httpService, _cookieService, _route) {
        this._httpService = _httpService;
        this._cookieService = _cookieService;
        this._route = _route;
        this.markerThatWasClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.closeMapPage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        //user info stored in the cookie:
        this.name = this._cookieService.get('user_name');
        this.user_id = this._cookieService.get('user_id');
        //Zoom level
        this.zoom = 9;
        //values
        this.markerName = '';
        this.markerLat = '';
        this.markerLng = '';
        //Markers
        this.markers = [];
        //parameter to load info page 
        this.info_page = false;
        this.add_info_page = false;
        this.users_trips_page = false;
        //variable that will be available to the child
        this.add_info_to_marker = null;
        this.info_for_child_to_display = null;
        //Day Count Variable and Money Count Variable
        this.day_money_obj = {
            'day_count': 0,
            'money_count': 0,
            'user_id': null,
            'trip_name': []
        };
        //new id when we want to see someone else's trips:
        this.new_id = null;
    }
    MapComponent.prototype.ngOnInit = function () {
        this.loadUserMarkersFromDB();
    };
    //this function will load all the locations when the user logged in, I am passing in the user_id cookie..
    MapComponent.prototype.loadUserMarkersFromDB = function () {
        var _this = this;
        //passing in the user_id from cookie
        this._httpService.loadUserMarkersFromDB(this.user_id)
            .then(function (data) {
            console.log("here are all the points that was loaded when we loaded the page: ", data._locations);
            //data is the objects of the user
            // so I need to make a loop and go through them all adding them to the markers array
            _this.markers = [];
            _this.day_money_obj = {
                'day_count': 0,
                'money_count': 0,
                'user_id': null,
                'trip_name': []
            };
            for (var i = 0; i < data._locations.length; i++) {
                var newMarker = { 'location_name': data._locations[i].location_name,
                    'latitude': data._locations[i].latitude,
                    'longitude': data._locations[i].longitude,
                    '_user': data._locations[i]._user,
                    'username': data._locations[i].username,
                    'content': data._locations[i].content,
                    'price': data._locations[i].price,
                    '_id': data._locations[i]._id,
                    'images': data._locations[i].images,
                    'img_url': data._locations[i].img_url,
                    'day_number': data._locations[i].day_number,
                    'trip_location': data._locations[i].trip_location
                };
                _this.markers.push(newMarker);
                //finding the largest day count Number...
                if (data._locations[i].day_number > _this.day_money_obj.day_count) {
                    _this.day_money_obj.day_count = data._locations[i].day_number;
                }
                _this.day_money_obj.money_count += data._locations[i].price;
                //adding the trip name to the user information..
                _this.day_money_obj.trip_name.push(data._locations[i].trip_location);
            }
            //add the users_id to the obj so we know what user to update the day and money count
            _this.day_money_obj.user_id = _this.user_id;
            //if no marker was placed start in the bay area else, start at the markers last placed position
            if (_this.markers.length == 0) {
                _this.latitude = 37.7749295;
                _this.longitude = -122.4194155;
            }
            else {
                _this.latitude = _this.markers[_this.markers.length - 1].latitude;
                _this.longitude = _this.markers[_this.markers.length - 1].longitude;
            }
            //add the updated informatino about the current days and money count to the DB:
            _this._httpService.addDayCountMoneyCountToUser(_this.day_money_obj)
                .then(function (data) {
                console.log("awesome this new feature worked");
            })
                .catch(function (err) {
                console.log("unable to update users money and day count");
            });
        })
            .catch(function (err) {
            console.log("there was an error when loading the locations on page load");
        });
    };
    MapComponent.prototype.clickedMarker = function (marker, index) {
        console.log('Clicked Marker:' + marker.name + ' at index ' + index);
    };
    // $event in this case was passed in and it is the object with coordinates and name
    MapComponent.prototype.mapClicked = function ($event) {
        var _this = this;
        if (this.new_id == this.user_id || this.new_id == null) {
            console.log("a new marker was added when the screen was clicked: ", event);
            var newMarker = {
                location_name: '',
                latitude: $event.coords.lat,
                longitude: $event.coords.lng,
                username: this.name,
                _user: this.user_id,
                icon_url: '',
                content: '',
                price: 0,
                day_number: 0,
                trip_location: ''
            };
            //add this location to the DB
            this._httpService.addLocationToDB(newMarker)
                .then(function (data) {
                if (data != null) {
                    _this.markers.push(data);
                    console.log("pushed this location to the markers array: ", data);
                    //moving the map to the location that was just added
                    _this.latitude = _this.markers[_this.markers.length - 1].latitude;
                    _this.longitude = _this.markers[_this.markers.length - 1].longitude;
                }
            })
                .catch(function (err) {
                console.log("unable to post location to the DB");
            });
        }
    };
    //using the input tag to look up a marker point using the google api
    MapComponent.prototype.getLocationName = function () {
        var _this = this;
        if (this.new_id == this.user_id || this.new_id == null) {
            this._httpService.getLocationName(this.markerName)
                .then(function (data) {
                console.log("this is the data that came back: ", data.results[0].geometry.location);
                _this.markerLat = data.results[0].geometry.location.lat;
                _this.markerLng = data.results[0].geometry.location.lng;
                var newMarker = {
                    location_name: _this.markerName,
                    latitude: parseFloat(_this.markerLat),
                    longitude: parseFloat(_this.markerLng),
                    username: _this.name,
                    _user: _this.user_id,
                    icon_url: '',
                    content: '',
                    price: 0,
                    day_number: 0,
                    trip_location: ''
                };
                //add this location to the DB
                _this._httpService.addLocationToDB(newMarker)
                    .then(function (data) {
                    if (data != null) {
                        _this.markers.push(data);
                        console.log("pushed this location to the markers array, ", data);
                        //moving the map to the location that was just added
                        _this.latitude = _this.markers[_this.markers.length - 1].latitude;
                        _this.longitude = _this.markers[_this.markers.length - 1].longitude;
                    }
                })
                    .catch(function (err) {
                    console.log("unable to post location to the DB");
                });
            })
                .catch(function (err) {
                console.log("ther was an error");
            });
        }
    };
    //removing the marker
    MapComponent.prototype.removeMarker = function (marker) {
        var _this = this;
        console.log("removing marker.... at the id of: ", marker._id);
        this._httpService.removeMarker(marker)
            .then(function (data) {
            //if successful removal then I need to update the users location
            _this._httpService.updateUsersLocations(marker)
                .then(function (data) {
                console.log("I think this means that I was able to remove one of the locations after updating the locaions array, ", data);
                _this.loadUserMarkersFromDB();
                // for(var i=0; i< this.markers.length; i++){
                //   if(marker.latitude == this.markers[i].latitude && marker.longitude == this.markers[i].longitude){
                //     this.markers.splice(i, 1)
                //   }
                // }
            })
                .catch(function (err) {
                console.log("Didnt work :( ");
            });
        })
            .catch(function (err) {
            console.log("unable to reload the locations");
        });
    };
    //the button that will open up the component on the bottom called APP INFO
    MapComponent.prototype.load_view_info = function (marker_obj) {
        this.info_page = true;
        this.add_info_page = false;
        this.info_for_child_to_display = marker_obj;
    };
    MapComponent.prototype.load_add_info = function (marker_obj) {
        this.add_info_page = true;
        this.info_page = false;
        this.add_info_to_marker = marker_obj;
        console.log("wanting to pass this information to the child: ", marker_obj);
        // this.markerThatWasClicked.emit(marker_obj);
    };
    MapComponent.prototype.reloadPage = function (event) {
        this.loadUserMarkersFromDB();
        if (event == false) {
            this.add_info_page = false;
        }
    };
    MapComponent.prototype.closeInfoPage = function (event) {
        if (event == false) {
            this.info_page = false;
        }
    };
    MapComponent.prototype.closeAddPage = function (event) {
        if (event == false) {
            this.add_info_page = false;
        }
    };
    MapComponent.prototype.showsUsersTrips = function () {
        this.users_trips_page = true;
    };
    MapComponent.prototype.closeUsersPage = function (event) {
        if (event == false) {
            this.users_trips_page = false;
        }
    };
    MapComponent.prototype.logout = function () {
        this.add_info_page = false;
        this.info_page = false;
        this.users_trips_page = false;
        this.closeMapPage.emit(false);
    };
    MapComponent.prototype.checkOutTrip = function (event) {
        console.log("I want to see this users trip: this should be there id..", event);
        this.new_id = event;
        ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////Attempting to load users points////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////
        this.loadUserMarkersFromDB_Remix();
    };
    MapComponent.prototype.loadUserMarkersFromDB_Remix = function () {
        var _this = this;
        //passing in the user_id from cookie
        this._httpService.loadUserMarkersFromDB_Remix(this.new_id)
            .then(function (data) {
            console.log("here are all the points that was loaded when we loaded the page: ", data._locations);
            //data is the objects of the user
            // so I need to make a loop and go through them all adding them to the markers array
            _this.markers = [];
            _this.day_money_obj = {
                'day_count': 0,
                'money_count': 0,
                'user_id': null,
                'trip_name': []
            };
            for (var i = 0; i < data._locations.length; i++) {
                var newMarker = { 'location_name': data._locations[i].location_name,
                    'latitude': data._locations[i].latitude,
                    'longitude': data._locations[i].longitude,
                    '_user': data._locations[i]._user,
                    'username': data._locations[i].username,
                    'content': data._locations[i].content,
                    'price': data._locations[i].price,
                    '_id': data._locations[i]._id,
                    'images': data._locations[i].images,
                    'img_url': data._locations[i].img_url,
                    'day_number': data._locations[i].day_number,
                    'trip_location': data._locations[i].trip_location
                };
                _this.markers.push(newMarker);
                //finding the largest day count Number...
                if (data._locations[i].day_number > _this.day_money_obj.day_count) {
                    _this.day_money_obj.day_count = data._locations[i].day_number;
                }
                _this.day_money_obj.money_count += data._locations[i].price;
                //adding the trip name to the user information..
                _this.day_money_obj.trip_name.push(data._locations[i].trip_location);
            }
            //add the users_id to the obj so we know what user to update the day and money count
            _this.day_money_obj.user_id = _this.new_id;
            //if no marker was placed start in the bay area else, start at the markers last placed position
            if (_this.markers.length == 0) {
                _this.latitude = 37.7749295;
                _this.longitude = -122.4194155;
            }
            else {
                _this.latitude = _this.markers[_this.markers.length - 1].latitude;
                _this.longitude = _this.markers[_this.markers.length - 1].longitude;
            }
            //add the updated informatino about the current days and money count to the DB:
            _this._httpService.addDayCountMoneyCountToUser(_this.day_money_obj)
                .then(function (data) {
                console.log("awesome this new feature worked");
            })
                .catch(function (err) {
                console.log("unable to update users money and day count");
            });
        })
            .catch(function (err) {
            console.log("there was an error when loading the locations on page load");
        });
    };
    return MapComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MapComponent.prototype, "markerThatWasClicked", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MapComponent.prototype, "closeMapPage", void 0);
MapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-map',
        template: __webpack_require__("../../../../../src/app/map/map.component.html"),
        styles: [__webpack_require__("../../../../../src/app/map/map.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_cookie_services_cookies_service__["CookieService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object])
], MapComponent);

var _a, _b, _c;
//# sourceMappingURL=map.component.js.map

/***/ }),

/***/ "../../../../../src/app/map/users-trips/users-trips.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".users-info{\n    width: 50%;\n    margin: 0 auto;\n}\n\n\n ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/map/users-trips/users-trips.component.html":
/***/ (function(module, exports) {

module.exports = "<br>\n<div>\n  <div class=\"users-info\">\n\n    <button class=\"btn btn-danger btn-xs\" style=\"text-align:left;float:left;\" (click)=\"closeUsersInfoPage()\">Close</button> \n    <button class=\"btn btn-warning\" (click)=\"reloadList()\" style=\"text-align:right;float:right;\">Reload List</button> \n    <hr style=\"clear:both;\"/>\n\n    <table class=\"table table-striped table-hover \">\n      <thead>\n        <tr>\n          <th>Trip Name</th>\n          <th>Username</th>\n          <th>Total Days</th>\n          <th>Total Cost</th>\n          <th>View Trip</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let trip of users_trips\">\n          <td><h6>{{ trip.trip_name[0] }}</h6></td>\n          <td><h6>{{ trip.username }}</h6></td>\n          <td><h6>{{ trip.day_count }}</h6></td>\n          <td><h6>{{ trip.money_count }}</h6></td>\n          <td><button class=\"btn btn-success\" (click)=\"checkOutUsersTrip(trip._id)\">View this trip!</button></td>\n        </tr>\n        \n      </tbody>\n    </table> \n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/map/users-trips/users-trips.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_services_cookies_service__ = __webpack_require__("../../../../../../node_modules/angular2-cookie/services/cookies.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_services_cookies_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_cookie_services_cookies_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_http_service__ = __webpack_require__("../../../../../src/app/http.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersTripsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersTripsComponent = (function () {
    function UsersTripsComponent(_httpService, _cookieService) {
        this._httpService = _httpService;
        this._cookieService = _cookieService;
        this.closeUsersPage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.checkOutTrip = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.users_trips = [];
    }
    UsersTripsComponent.prototype.ngOnInit = function () {
        this.loadUserTrips();
    };
    UsersTripsComponent.prototype.loadUserTrips = function () {
        var _this = this;
        this._httpService.loadUserTrips()
            .then(function (data) {
            _this.users_trips = data;
            console.log("I want to see all the users trips: ", data);
        })
            .catch(function (err) {
            console.log("unable to post location to the DB");
        });
    };
    //button when clicked will reload the list of trips:
    UsersTripsComponent.prototype.reloadList = function () {
        this.loadUserTrips();
    };
    UsersTripsComponent.prototype.closeUsersInfoPage = function () {
        this.closeUsersPage.emit(false);
    };
    UsersTripsComponent.prototype.checkOutUsersTrip = function (user_id) {
        this.checkOutTrip.emit(user_id);
        this.closeUsersInfoPage();
    };
    return UsersTripsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], UsersTripsComponent.prototype, "closeUsersPage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], UsersTripsComponent.prototype, "checkOutTrip", void 0);
UsersTripsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users-trips',
        template: __webpack_require__("../../../../../src/app/map/users-trips/users-trips.component.html"),
        styles: [__webpack_require__("../../../../../src/app/map/users-trips/users-trips.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_services_cookies_service__["CookieService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_cookie_services_cookies_service__["CookieService"]) === "function" && _b || Object])
], UsersTripsComponent);

var _a, _b;
//# sourceMappingURL=users-trips.component.js.map

/***/ }),

/***/ "../../../../../src/app/map/view-info/view-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".info_div{\n    width: 50%;\n    margin: 0 auto;\n}\n\n.title{\n    display: inline-block;\n    vertical-align: top;\n}\n\n.price{\n    display: inline-block;\n    vertical-align: top;\n    margin-left: 45%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/map/view-info/view-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"parent-div\">\n  <div class=\"info_div\">\n    <!--{{displayMarkerInfo | json}}-->\n    <button class=\"btn btn-danger btn-xs\" (click)=\"closeViewInfo()\">X</button>\n    <div class=\"well well-lg\">\n      <h1 style=\"text-align:left;float:left;\">{{displayMarkerInfo.location_name}}</h1> \n      <h3 style=\"text-align:right;float:right;\">${{displayMarkerInfo.price}}</h3> \n      <hr style=\"clear:both;\"/>\n\n      <h4 class=\"text-info\">Day Number: {{displayMarkerInfo.day_number}}</h4>\n\n      <p>{{displayMarkerInfo.content}}</p>\n\n       <div class=\"image-selection\">\n        <img class=\"mySlides\" src={{displayMarkerInfo.images[0]}}  style=\"width:100%\">\n        <img class=\"mySlides\" src={{displayMarkerInfo.images[1]}}  style=\"width:100%\">\n        <img class=\"mySlides\" src={{displayMarkerInfo.images[2]}}  style=\"width:100%\">\n      </div>\n\n    </div>\n\n   \n\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/map/view-info/view-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ViewInfoComponent = (function () {
    function ViewInfoComponent() {
        this.xClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ViewInfoComponent.prototype.ngOnInit = function () {
    };
    ViewInfoComponent.prototype.closeViewInfo = function () {
        this.xClicked.emit(false);
    };
    return ViewInfoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ViewInfoComponent.prototype, "displayMarkerInfo", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ViewInfoComponent.prototype, "xClicked", void 0);
ViewInfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-view-info',
        template: __webpack_require__("../../../../../src/app/map/view-info/view-info.component.html"),
        styles: [__webpack_require__("../../../../../src/app/map/view-info/view-info.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ViewInfoComponent);

//# sourceMappingURL=view-info.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map