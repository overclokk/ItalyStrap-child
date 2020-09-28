!function(global, factory) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = factory(require("popper.js")) : "function" == typeof define && define.amd ? define([ "popper.js" ], factory) : (global = global || self, 
    global.bootstrap = factory(global.Popper));
}(this, function(Popper) {
    "use strict";
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        Constructor;
    }
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            })), keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
        return target;
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, 
        subClass.__proto__ = superClass;
    }
    function getUidEvent(element, uid) {
        return uid && uid + "::" + uidEvent++ || element.uidEvent || uidEvent++;
    }
    function getEvent(element) {
        var uid = getUidEvent(element);
        return element.uidEvent = uid, eventRegistry[uid] = eventRegistry[uid] || {}, eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
        return function handler(event) {
            return handler.oneOff && EventHandler.off(element, event.type, fn), fn.apply(element, [ event ]);
        };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
            for (var domElements = element.querySelectorAll(selector), target = event.target; target && target !== this; target = target.parentNode) for (var i = domElements.length; i--; ) if (domElements[i] === target) return handler.oneOff && EventHandler.off(element, event.type, fn), 
            fn.apply(target, [ event ]);
            return null;
        };
    }
    function findHandler(events, handler, delegationSelector) {
        void 0 === delegationSelector && (delegationSelector = null);
        for (var uidEventList = Object.keys(events), i = 0, len = uidEventList.length; i < len; i++) {
            var event = events[uidEventList[i]];
            if (event.originalHandler === handler && event.delegationSelector === delegationSelector) return event;
        }
        return null;
    }
    function normalizeParams(originalTypeEvent, handler, delegationFn) {
        var delegation = "string" == typeof handler, originalHandler = delegation ? delegationFn : handler, typeEvent = originalTypeEvent.replace(stripNameRegex, ""), custom = customEvents[typeEvent];
        custom && (typeEvent = custom);
        var isNative = nativeEvents.indexOf(typeEvent) > -1;
        return isNative || (typeEvent = originalTypeEvent), [ delegation, originalHandler, typeEvent ];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
        if ("string" == typeof originalTypeEvent && element) {
            handler || (handler = delegationFn, delegationFn = null);
            var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn), delegation = _normalizeParams[0], originalHandler = _normalizeParams[1], typeEvent = _normalizeParams[2], events = getEvent(element), handlers = events[typeEvent] || (events[typeEvent] = {}), previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
            if (previousFn) return void (previousFn.oneOff = previousFn.oneOff && oneOff);
            var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, "")), fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
            fn.delegationSelector = delegation ? handler : null, fn.originalHandler = originalHandler, 
            fn.oneOff = oneOff, fn.uidEvent = uid, handlers[uid] = fn, element.addEventListener(typeEvent, fn, delegation);
        }
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        var fn = findHandler(events[typeEvent], handler, delegationSelector);
        fn && (element.removeEventListener(typeEvent, fn, Boolean(delegationSelector)), 
        delete events[typeEvent][fn.uidEvent]);
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        var storeElementEvent = events[typeEvent] || {};
        Object.keys(storeElementEvent).forEach(function(handlerKey) {
            if (handlerKey.indexOf(namespace) > -1) {
                var event = storeElementEvent[handlerKey];
                removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
        });
    }
    function normalizeData(val) {
        return "true" === val || "false" !== val && (val === Number(val).toString() ? Number(val) : "" === val || "null" === val ? null : val);
    }
    function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, function(chr) {
            return "-" + chr.toLowerCase();
        });
    }
    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        var _ref;
        if (!unsafeHtml.length) return unsafeHtml;
        if (sanitizeFn && "function" == typeof sanitizeFn) return sanitizeFn(unsafeHtml);
        for (var domParser = new window.DOMParser(), createdDocument = domParser.parseFromString(unsafeHtml, "text/html"), whitelistKeys = Object.keys(whiteList), elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll("*")), _loop = function(i, len) {
            var _ref2, el = elements[i], elName = el.nodeName.toLowerCase();
            if (whitelistKeys.indexOf(elName) === -1) return el.parentNode.removeChild(el), 
            "continue";
            var attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes), whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);
            attributeList.forEach(function(attr) {
                allowedAttribute(attr, whitelistedAttributes) || el.removeAttribute(attr.nodeName);
            });
        }, i = 0, len = elements.length; i < len; i++) {
            _loop(i);
        }
        return createdDocument.body.innerHTML;
    }
    Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, "default") ? Popper.default : Popper;
    var MAX_UID = 1e6, MILLISECONDS_MULTIPLIER = 1e3, TRANSITION_END = "transitionend", toType = function(obj) {
        return null === obj || void 0 === obj ? "" + obj : {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }, getUID = function(prefix) {
        do prefix += Math.floor(Math.random() * MAX_UID); while (document.getElementById(prefix));
        return prefix;
    }, getSelector = function(element) {
        var selector = element.getAttribute("data-target");
        if (!selector || "#" === selector) {
            var hrefAttr = element.getAttribute("href");
            selector = hrefAttr && "#" !== hrefAttr ? hrefAttr.trim() : null;
        }
        return selector;
    }, getSelectorFromElement = function(element) {
        var selector = getSelector(element);
        return selector && document.querySelector(selector) ? selector : null;
    }, getElementFromSelector = function(element) {
        var selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
    }, getTransitionDurationFromElement = function(element) {
        if (!element) return 0;
        var _window$getComputedSt = window.getComputedStyle(element), transitionDuration = _window$getComputedSt.transitionDuration, transitionDelay = _window$getComputedSt.transitionDelay, floatTransitionDuration = parseFloat(transitionDuration), floatTransitionDelay = parseFloat(transitionDelay);
        return floatTransitionDuration || floatTransitionDelay ? (transitionDuration = transitionDuration.split(",")[0], 
        transitionDelay = transitionDelay.split(",")[0], (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER) : 0;
    }, triggerTransitionEnd = function(element) {
        element.dispatchEvent(new Event(TRANSITION_END));
    }, isElement = function(obj) {
        return (obj[0] || obj).nodeType;
    }, emulateTransitionEnd = function(element, duration) {
        function listener() {
            called = !0, element.removeEventListener(TRANSITION_END, listener);
        }
        var called = !1, durationPadding = 5, emulatedDuration = duration + durationPadding;
        element.addEventListener(TRANSITION_END, listener), setTimeout(function() {
            called || triggerTransitionEnd(element);
        }, emulatedDuration);
    }, typeCheckConfig = function(componentName, config, configTypes) {
        Object.keys(configTypes).forEach(function(property) {
            var expectedTypes = configTypes[property], value = config[property], valueType = value && isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) throw new Error(componentName.toUpperCase() + ": " + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
        });
    }, isVisible = function(element) {
        if (!element) return !1;
        if (element.style && element.parentNode && element.parentNode.style) {
            var elementStyle = getComputedStyle(element), parentNodeStyle = getComputedStyle(element.parentNode);
            return "none" !== elementStyle.display && "none" !== parentNodeStyle.display && "hidden" !== elementStyle.visibility;
        }
        return !1;
    }, findShadowRoot = function findShadowRoot(element) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" == typeof element.getRootNode) {
            var root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
        }
        return element instanceof ShadowRoot ? element : element.parentNode ? findShadowRoot(element.parentNode) : null;
    }, noop = function() {
        return function() {};
    }, reflow = function(element) {
        return element.offsetHeight;
    }, getjQuery = function() {
        var _window = window, jQuery = _window.jQuery;
        return jQuery && !document.body.hasAttribute("data-no-jquery") ? jQuery : null;
    }, mapData = function() {
        var storeData = {}, id = 1;
        return {
            set: function(element, key, data) {
                "undefined" == typeof element.key && (element.key = {
                    key: key,
                    id: id
                }, id++), storeData[element.key.id] = data;
            },
            get: function(element, key) {
                if (!element || "undefined" == typeof element.key) return null;
                var keyProperties = element.key;
                return keyProperties.key === key ? storeData[keyProperties.id] : null;
            },
            delete: function(element, key) {
                if ("undefined" != typeof element.key) {
                    var keyProperties = element.key;
                    keyProperties.key === key && (delete storeData[keyProperties.id], delete element.key);
                }
            }
        };
    }(), Data = {
        setData: function(instance, key, data) {
            mapData.set(instance, key, data);
        },
        getData: function(instance, key) {
            return mapData.get(instance, key);
        },
        removeData: function(instance, key) {
            mapData.delete(instance, key);
        }
    }, find = Element.prototype.querySelectorAll, findOne = Element.prototype.querySelector, defaultPreventedPreservedOnDispatch = function() {
        var e = new CustomEvent("Bootstrap", {
            cancelable: !0
        }), element = document.createElement("div");
        return element.addEventListener("Bootstrap", function() {
            return null;
        }), e.preventDefault(), element.dispatchEvent(e), e.defaultPrevented;
    }(), scopeSelectorRegex = /:scope\b/, supportScopeQuery = function() {
        var element = document.createElement("div");
        try {
            element.querySelectorAll(":scope *");
        } catch (_) {
            return !1;
        }
        return !0;
    }();
    supportScopeQuery || (find = function(selector) {
        if (!scopeSelectorRegex.test(selector)) return this.querySelectorAll(selector);
        var hasId = Boolean(this.id);
        hasId || (this.id = getUID("scope"));
        var nodeList = null;
        try {
            selector = selector.replace(scopeSelectorRegex, "#" + this.id), nodeList = this.querySelectorAll(selector);
        } finally {
            hasId || this.removeAttribute("id");
        }
        return nodeList;
    }, findOne = function(selector) {
        if (!scopeSelectorRegex.test(selector)) return this.querySelector(selector);
        var matches = find.call(this, selector);
        return "undefined" != typeof matches[0] ? matches[0] : null;
    });
    var $ = getjQuery(), namespaceRegex = /[^.]*(?=\..*)\.|.*/, stripNameRegex = /\..*/, stripUidRegex = /::\d+$/, eventRegistry = {}, uidEvent = 1, customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, nativeEvents = [ "click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll" ], EventHandler = {
        on: function(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, !1);
        },
        one: function(element, event, handler, delegationFn) {
            addHandler(element, event, handler, delegationFn, !0);
        },
        off: function(element, originalTypeEvent, handler, delegationFn) {
            if ("string" == typeof originalTypeEvent && element) {
                var _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn), delegation = _normalizeParams2[0], originalHandler = _normalizeParams2[1], typeEvent = _normalizeParams2[2], inNamespace = typeEvent !== originalTypeEvent, events = getEvent(element), isNamespace = "." === originalTypeEvent.charAt(0);
                if ("undefined" != typeof originalHandler) {
                    if (!events || !events[typeEvent]) return;
                    return void removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
                }
                isNamespace && Object.keys(events).forEach(function(elementEvent) {
                    removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
                });
                var storeElementEvent = events[typeEvent] || {};
                Object.keys(storeElementEvent).forEach(function(keyHandlers) {
                    var handlerKey = keyHandlers.replace(stripUidRegex, "");
                    if (!inNamespace || originalTypeEvent.indexOf(handlerKey) > -1) {
                        var event = storeElementEvent[keyHandlers];
                        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
                    }
                });
            }
        },
        trigger: function(element, event, args) {
            if ("string" != typeof event || !element) return null;
            var jQueryEvent, typeEvent = event.replace(stripNameRegex, ""), inNamespace = event !== typeEvent, isNative = nativeEvents.indexOf(typeEvent) > -1, bubbles = !0, nativeDispatch = !0, defaultPrevented = !1, evt = null;
            return inNamespace && $ && (jQueryEvent = $.Event(event, args), $(element).trigger(jQueryEvent), 
            bubbles = !jQueryEvent.isPropagationStopped(), nativeDispatch = !jQueryEvent.isImmediatePropagationStopped(), 
            defaultPrevented = jQueryEvent.isDefaultPrevented()), isNative ? (evt = document.createEvent("HTMLEvents"), 
            evt.initEvent(typeEvent, bubbles, !0)) : evt = new CustomEvent(event, {
                bubbles: bubbles,
                cancelable: !0
            }), "undefined" != typeof args && Object.keys(args).forEach(function(key) {
                Object.defineProperty(evt, key, {
                    get: function() {
                        return args[key];
                    }
                });
            }), defaultPrevented && (evt.preventDefault(), defaultPreventedPreservedOnDispatch || Object.defineProperty(evt, "defaultPrevented", {
                get: function() {
                    return !0;
                }
            })), nativeDispatch && element.dispatchEvent(evt), evt.defaultPrevented && "undefined" != typeof jQueryEvent && jQueryEvent.preventDefault(), 
            evt;
        }
    }, NAME = "alert", VERSION = "5.0.0-alpha1", DATA_KEY = "bs.alert", EVENT_KEY = "." + DATA_KEY, DATA_API_KEY = ".data-api", SELECTOR_DISMISS = '[data-dismiss="alert"]', EVENT_CLOSE = "close" + EVENT_KEY, EVENT_CLOSED = "closed" + EVENT_KEY, EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY, CLASSNAME_ALERT = "alert", CLASSNAME_FADE = "fade", CLASSNAME_SHOW = "show", Alert = function() {
        function Alert(element) {
            this._element = element, this._element && Data.setData(element, DATA_KEY, this);
        }
        var _proto = Alert.prototype;
        return _proto.close = function(element) {
            var rootElement = this._element;
            element && (rootElement = this._getRootElement(element));
            var customEvent = this._triggerCloseEvent(rootElement);
            null === customEvent || customEvent.defaultPrevented || this._removeElement(rootElement);
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY), this._element = null;
        }, _proto._getRootElement = function(element) {
            return getElementFromSelector(element) || element.closest("." + CLASSNAME_ALERT);
        }, _proto._triggerCloseEvent = function(element) {
            return EventHandler.trigger(element, EVENT_CLOSE);
        }, _proto._removeElement = function(element) {
            var _this = this;
            if (element.classList.remove(CLASSNAME_SHOW), !element.classList.contains(CLASSNAME_FADE)) return void this._destroyElement(element);
            var transitionDuration = getTransitionDurationFromElement(element);
            EventHandler.one(element, TRANSITION_END, function() {
                return _this._destroyElement(element);
            }), emulateTransitionEnd(element, transitionDuration);
        }, _proto._destroyElement = function(element) {
            element.parentNode && element.parentNode.removeChild(element), EventHandler.trigger(element, EVENT_CLOSED);
        }, Alert.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY);
                data || (data = new Alert(this)), "close" === config && data[config](this);
            });
        }, Alert.handleDismiss = function(alertInstance) {
            return function(event) {
                event && event.preventDefault(), alertInstance.close(this);
            };
        }, Alert.getInstance = function(element) {
            return Data.getData(element, DATA_KEY);
        }, _createClass(Alert, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION;
            }
        } ]), Alert;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
    var $$1 = getjQuery();
    if ($$1) {
        var JQUERY_NO_CONFLICT = $$1.fn[NAME];
        $$1.fn[NAME] = Alert.jQueryInterface, $$1.fn[NAME].Constructor = Alert, $$1.fn[NAME].noConflict = function() {
            return $$1.fn[NAME] = JQUERY_NO_CONFLICT, Alert.jQueryInterface;
        };
    }
    var NAME$1 = "button", VERSION$1 = "5.0.0-alpha1", DATA_KEY$1 = "bs.button", EVENT_KEY$1 = "." + DATA_KEY$1, DATA_API_KEY$1 = ".data-api", CLASS_NAME_ACTIVE = "active", SELECTOR_DATA_TOGGLE = '[data-toggle="button"]', EVENT_CLICK_DATA_API$1 = "click" + EVENT_KEY$1 + DATA_API_KEY$1, Button = function() {
        function Button(element) {
            this._element = element, Data.setData(element, DATA_KEY$1, this);
        }
        var _proto = Button.prototype;
        return _proto.toggle = function() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE));
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY$1), this._element = null;
        }, Button.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$1);
                data || (data = new Button(this)), "toggle" === config && data[config]();
            });
        }, Button.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$1);
        }, _createClass(Button, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$1;
            }
        } ]), Button;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function(event) {
        event.preventDefault();
        var button = event.target.closest(SELECTOR_DATA_TOGGLE), data = Data.getData(button, DATA_KEY$1);
        data || (data = new Button(button)), data.toggle();
    });
    var $$2 = getjQuery();
    if ($$2) {
        var JQUERY_NO_CONFLICT$1 = $$2.fn[NAME$1];
        $$2.fn[NAME$1] = Button.jQueryInterface, $$2.fn[NAME$1].Constructor = Button, $$2.fn[NAME$1].noConflict = function() {
            return $$2.fn[NAME$1] = JQUERY_NO_CONFLICT$1, Button.jQueryInterface;
        };
    }
    var Manipulator = {
        setDataAttribute: function(element, key, value) {
            element.setAttribute("data-" + normalizeDataKey(key), value);
        },
        removeDataAttribute: function(element, key) {
            element.removeAttribute("data-" + normalizeDataKey(key));
        },
        getDataAttributes: function(element) {
            if (!element) return {};
            var attributes = _objectSpread2({}, element.dataset);
            return Object.keys(attributes).forEach(function(key) {
                attributes[key] = normalizeData(attributes[key]);
            }), attributes;
        },
        getDataAttribute: function(element, key) {
            return normalizeData(element.getAttribute("data-" + normalizeDataKey(key)));
        },
        offset: function(element) {
            var rect = element.getBoundingClientRect();
            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        },
        position: function(element) {
            return {
                top: element.offsetTop,
                left: element.offsetLeft
            };
        },
        toggleClass: function(element, className) {
            element && (element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className));
        }
    }, NODE_TEXT = 3, SelectorEngine = {
        matches: function(element, selector) {
            return element.matches(selector);
        },
        find: function(selector, element) {
            var _ref;
            return void 0 === element && (element = document.documentElement), (_ref = []).concat.apply(_ref, find.call(element, selector));
        },
        findOne: function(selector, element) {
            return void 0 === element && (element = document.documentElement), findOne.call(element, selector);
        },
        children: function children(element, selector) {
            var _ref2, children = (_ref2 = []).concat.apply(_ref2, element.children);
            return children.filter(function(child) {
                return child.matches(selector);
            });
        },
        parents: function parents(element, selector) {
            for (var parents = [], ancestor = element.parentNode; ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT; ) this.matches(ancestor, selector) && parents.push(ancestor), 
            ancestor = ancestor.parentNode;
            return parents;
        },
        prev: function(element, selector) {
            for (var previous = element.previousElementSibling; previous; ) {
                if (previous.matches(selector)) return [ previous ];
                previous = previous.previousElementSibling;
            }
            return [];
        },
        next: function next(element, selector) {
            for (var next = element.nextElementSibling; next; ) {
                if (this.matches(next, selector)) return [ next ];
                next = next.nextElementSibling;
            }
            return [];
        }
    }, NAME$2 = "carousel", VERSION$2 = "5.0.0-alpha1", DATA_KEY$2 = "bs.carousel", EVENT_KEY$2 = "." + DATA_KEY$2, DATA_API_KEY$2 = ".data-api", ARROW_LEFT_KEY = "ArrowLeft", ARROW_RIGHT_KEY = "ArrowRight", TOUCHEVENT_COMPAT_WAIT = 500, SWIPE_THRESHOLD = 40, Default = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0
    }, DefaultType = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean"
    }, DIRECTION_NEXT = "next", DIRECTION_PREV = "prev", DIRECTION_LEFT = "left", DIRECTION_RIGHT = "right", EVENT_SLIDE = "slide" + EVENT_KEY$2, EVENT_SLID = "slid" + EVENT_KEY$2, EVENT_KEYDOWN = "keydown" + EVENT_KEY$2, EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY$2, EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY$2, EVENT_TOUCHSTART = "touchstart" + EVENT_KEY$2, EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY$2, EVENT_TOUCHEND = "touchend" + EVENT_KEY$2, EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY$2, EVENT_POINTERUP = "pointerup" + EVENT_KEY$2, EVENT_DRAG_START = "dragstart" + EVENT_KEY$2, EVENT_LOAD_DATA_API = "load" + EVENT_KEY$2 + DATA_API_KEY$2, EVENT_CLICK_DATA_API$2 = "click" + EVENT_KEY$2 + DATA_API_KEY$2, CLASS_NAME_CAROUSEL = "carousel", CLASS_NAME_ACTIVE$1 = "active", CLASS_NAME_SLIDE = "slide", CLASS_NAME_RIGHT = "carousel-item-right", CLASS_NAME_LEFT = "carousel-item-left", CLASS_NAME_NEXT = "carousel-item-next", CLASS_NAME_PREV = "carousel-item-prev", CLASS_NAME_POINTER_EVENT = "pointer-event", SELECTOR_ACTIVE = ".active", SELECTOR_ACTIVE_ITEM = ".active.carousel-item", SELECTOR_ITEM = ".carousel-item", SELECTOR_ITEM_IMG = ".carousel-item img", SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev", SELECTOR_INDICATORS = ".carousel-indicators", SELECTOR_DATA_SLIDE = "[data-slide], [data-slide-to]", SELECTOR_DATA_RIDE = '[data-ride="carousel"]', PointerType = {
        TOUCH: "touch",
        PEN: "pen"
    }, Carousel = function() {
        function Carousel(element, config) {
            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, 
            this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, 
            this._config = this._getConfig(config), this._element = element, this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element), 
            this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, 
            this._pointerEvent = Boolean(window.PointerEvent), this._addEventListeners(), Data.setData(element, DATA_KEY$2, this);
        }
        var _proto = Carousel.prototype;
        return _proto.next = function() {
            this._isSliding || this._slide(DIRECTION_NEXT);
        }, _proto.nextWhenVisible = function() {
            !document.hidden && isVisible(this._element) && this.next();
        }, _proto.prev = function() {
            this._isSliding || this._slide(DIRECTION_PREV);
        }, _proto.pause = function(event) {
            event || (this._isPaused = !0), SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element) && (triggerTransitionEnd(this._element), 
            this.cycle(!0)), clearInterval(this._interval), this._interval = null;
        }, _proto.cycle = function(event) {
            event || (this._isPaused = !1), this._interval && (clearInterval(this._interval), 
            this._interval = null), this._config && this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
        }, _proto.to = function(index) {
            var _this = this;
            this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
            var activeIndex = this._getItemIndex(this._activeElement);
            if (!(index > this._items.length - 1 || index < 0)) {
                if (this._isSliding) return void EventHandler.one(this._element, EVENT_SLID, function() {
                    return _this.to(index);
                });
                if (activeIndex === index) return this.pause(), void this.cycle();
                var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;
                this._slide(direction, this._items[index]);
            }
        }, _proto.dispose = function() {
            EventHandler.off(this._element, EVENT_KEY$2), Data.removeData(this._element, DATA_KEY$2), 
            this._items = null, this._config = null, this._element = null, this._interval = null, 
            this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
        }, _proto._getConfig = function(config) {
            return config = _objectSpread2(_objectSpread2({}, Default), config), typeCheckConfig(NAME$2, config, DefaultType), 
            config;
        }, _proto._handleSwipe = function() {
            var absDeltax = Math.abs(this.touchDeltaX);
            if (!(absDeltax <= SWIPE_THRESHOLD)) {
                var direction = absDeltax / this.touchDeltaX;
                this.touchDeltaX = 0, direction > 0 && this.prev(), direction < 0 && this.next();
            }
        }, _proto._addEventListeners = function() {
            var _this2 = this;
            this._config.keyboard && EventHandler.on(this._element, EVENT_KEYDOWN, function(event) {
                return _this2._keydown(event);
            }), "hover" === this._config.pause && (EventHandler.on(this._element, EVENT_MOUSEENTER, function(event) {
                return _this2.pause(event);
            }), EventHandler.on(this._element, EVENT_MOUSELEAVE, function(event) {
                return _this2.cycle(event);
            })), this._config.touch && this._touchSupported && this._addTouchEventListeners();
        }, _proto._addTouchEventListeners = function() {
            var _this3 = this, start = function(event) {
                _this3._pointerEvent && PointerType[event.pointerType.toUpperCase()] ? _this3.touchStartX = event.clientX : _this3._pointerEvent || (_this3.touchStartX = event.touches[0].clientX);
            }, move = function(event) {
                event.touches && event.touches.length > 1 ? _this3.touchDeltaX = 0 : _this3.touchDeltaX = event.touches[0].clientX - _this3.touchStartX;
            }, end = function(event) {
                _this3._pointerEvent && PointerType[event.pointerType.toUpperCase()] && (_this3.touchDeltaX = event.clientX - _this3.touchStartX), 
                _this3._handleSwipe(), "hover" === _this3._config.pause && (_this3.pause(), _this3.touchTimeout && clearTimeout(_this3.touchTimeout), 
                _this3.touchTimeout = setTimeout(function(event) {
                    return _this3.cycle(event);
                }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval));
            };
            SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function(itemImg) {
                EventHandler.on(itemImg, EVENT_DRAG_START, function(e) {
                    return e.preventDefault();
                });
            }), this._pointerEvent ? (EventHandler.on(this._element, EVENT_POINTERDOWN, function(event) {
                return start(event);
            }), EventHandler.on(this._element, EVENT_POINTERUP, function(event) {
                return end(event);
            }), this._element.classList.add(CLASS_NAME_POINTER_EVENT)) : (EventHandler.on(this._element, EVENT_TOUCHSTART, function(event) {
                return start(event);
            }), EventHandler.on(this._element, EVENT_TOUCHMOVE, function(event) {
                return move(event);
            }), EventHandler.on(this._element, EVENT_TOUCHEND, function(event) {
                return end(event);
            }));
        }, _proto._keydown = function(event) {
            if (!/input|textarea/i.test(event.target.tagName)) switch (event.key) {
              case ARROW_LEFT_KEY:
                event.preventDefault(), this.prev();
                break;

              case ARROW_RIGHT_KEY:
                event.preventDefault(), this.next();
            }
        }, _proto._getItemIndex = function(element) {
            return this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [], 
            this._items.indexOf(element);
        }, _proto._getItemByDirection = function(direction, activeElement) {
            var isNextDirection = direction === DIRECTION_NEXT, isPrevDirection = direction === DIRECTION_PREV, activeIndex = this._getItemIndex(activeElement), lastItemIndex = this._items.length - 1, isGoingToWrap = isPrevDirection && 0 === activeIndex || isNextDirection && activeIndex === lastItemIndex;
            if (isGoingToWrap && !this._config.wrap) return activeElement;
            var delta = direction === DIRECTION_PREV ? -1 : 1, itemIndex = (activeIndex + delta) % this._items.length;
            return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        }, _proto._triggerSlideEvent = function(relatedTarget, eventDirectionName) {
            var targetIndex = this._getItemIndex(relatedTarget), fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));
            return EventHandler.trigger(this._element, EVENT_SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
            });
        }, _proto._setActiveIndicatorElement = function(element) {
            if (this._indicatorsElement) {
                for (var indicators = SelectorEngine.find(SELECTOR_ACTIVE, this._indicatorsElement), i = 0; i < indicators.length; i++) indicators[i].classList.remove(CLASS_NAME_ACTIVE$1);
                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
                nextIndicator && nextIndicator.classList.add(CLASS_NAME_ACTIVE$1);
            }
        }, _proto._slide = function(direction, element) {
            var directionalClassName, orderClassName, eventDirectionName, _this4 = this, activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element), activeElementIndex = this._getItemIndex(activeElement), nextElement = element || activeElement && this._getItemByDirection(direction, activeElement), nextElementIndex = this._getItemIndex(nextElement), isCycling = Boolean(this._interval);
            if (direction === DIRECTION_NEXT ? (directionalClassName = CLASS_NAME_LEFT, orderClassName = CLASS_NAME_NEXT, 
            eventDirectionName = DIRECTION_LEFT) : (directionalClassName = CLASS_NAME_RIGHT, 
            orderClassName = CLASS_NAME_PREV, eventDirectionName = DIRECTION_RIGHT), nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) return void (this._isSliding = !1);
            var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (!slideEvent.defaultPrevented && activeElement && nextElement) {
                if (this._isSliding = !0, isCycling && this.pause(), this._setActiveIndicatorElement(nextElement), 
                this._element.classList.contains(CLASS_NAME_SLIDE)) {
                    nextElement.classList.add(orderClassName), reflow(nextElement), activeElement.classList.add(directionalClassName), 
                    nextElement.classList.add(directionalClassName);
                    var nextElementInterval = parseInt(nextElement.getAttribute("data-interval"), 10);
                    nextElementInterval ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, 
                    this._config.interval = nextElementInterval) : this._config.interval = this._config.defaultInterval || this._config.interval;
                    var transitionDuration = getTransitionDurationFromElement(activeElement);
                    EventHandler.one(activeElement, TRANSITION_END, function() {
                        nextElement.classList.remove(directionalClassName, orderClassName), nextElement.classList.add(CLASS_NAME_ACTIVE$1), 
                        activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName), 
                        _this4._isSliding = !1, setTimeout(function() {
                            EventHandler.trigger(_this4._element, EVENT_SLID, {
                                relatedTarget: nextElement,
                                direction: eventDirectionName,
                                from: activeElementIndex,
                                to: nextElementIndex
                            });
                        }, 0);
                    }), emulateTransitionEnd(activeElement, transitionDuration);
                } else activeElement.classList.remove(CLASS_NAME_ACTIVE$1), nextElement.classList.add(CLASS_NAME_ACTIVE$1), 
                this._isSliding = !1, EventHandler.trigger(this._element, EVENT_SLID, {
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                });
                isCycling && this.cycle();
            }
        }, Carousel.carouselInterface = function(element, config) {
            var data = Data.getData(element, DATA_KEY$2), _config = _objectSpread2(_objectSpread2({}, Default), Manipulator.getDataAttributes(element));
            "object" == typeof config && (_config = _objectSpread2(_objectSpread2({}, _config), config));
            var action = "string" == typeof config ? config : _config.slide;
            if (data || (data = new Carousel(element, _config)), "number" == typeof config) data.to(config); else if ("string" == typeof action) {
                if ("undefined" == typeof data[action]) throw new TypeError('No method named "' + action + '"');
                data[action]();
            } else _config.interval && _config.ride && (data.pause(), data.cycle());
        }, Carousel.jQueryInterface = function(config) {
            return this.each(function() {
                Carousel.carouselInterface(this, config);
            });
        }, Carousel.dataApiClickHandler = function(event) {
            var target = getElementFromSelector(this);
            if (target && target.classList.contains(CLASS_NAME_CAROUSEL)) {
                var config = _objectSpread2(_objectSpread2({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this)), slideIndex = this.getAttribute("data-slide-to");
                slideIndex && (config.interval = !1), Carousel.carouselInterface(target, config), 
                slideIndex && Data.getData(target, DATA_KEY$2).to(slideIndex), event.preventDefault();
            }
        }, Carousel.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$2);
        }, _createClass(Carousel, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$2;
            }
        }, {
            key: "Default",
            get: function() {
                return Default;
            }
        } ]), Carousel;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler), 
    EventHandler.on(window, EVENT_LOAD_DATA_API, function() {
        for (var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE), i = 0, len = carousels.length; i < len; i++) Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
    });
    var $$3 = getjQuery();
    if ($$3) {
        var JQUERY_NO_CONFLICT$2 = $$3.fn[NAME$2];
        $$3.fn[NAME$2] = Carousel.jQueryInterface, $$3.fn[NAME$2].Constructor = Carousel, 
        $$3.fn[NAME$2].noConflict = function() {
            return $$3.fn[NAME$2] = JQUERY_NO_CONFLICT$2, Carousel.jQueryInterface;
        };
    }
    var NAME$3 = "collapse", VERSION$3 = "5.0.0-alpha1", DATA_KEY$3 = "bs.collapse", EVENT_KEY$3 = "." + DATA_KEY$3, DATA_API_KEY$3 = ".data-api", Default$1 = {
        toggle: !0,
        parent: ""
    }, DefaultType$1 = {
        toggle: "boolean",
        parent: "(string|element)"
    }, EVENT_SHOW = "show" + EVENT_KEY$3, EVENT_SHOWN = "shown" + EVENT_KEY$3, EVENT_HIDE = "hide" + EVENT_KEY$3, EVENT_HIDDEN = "hidden" + EVENT_KEY$3, EVENT_CLICK_DATA_API$3 = "click" + EVENT_KEY$3 + DATA_API_KEY$3, CLASS_NAME_SHOW = "show", CLASS_NAME_COLLAPSE = "collapse", CLASS_NAME_COLLAPSING = "collapsing", CLASS_NAME_COLLAPSED = "collapsed", WIDTH = "width", HEIGHT = "height", SELECTOR_ACTIVES = ".show, .collapsing", SELECTOR_DATA_TOGGLE$1 = '[data-toggle="collapse"]', Collapse = function() {
        function Collapse(element, config) {
            this._isTransitioning = !1, this._element = element, this._config = this._getConfig(config), 
            this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + '[href="#' + element.id + '"],' + (SELECTOR_DATA_TOGGLE$1 + '[data-target="#' + element.id + '"]'));
            for (var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1), i = 0, len = toggleList.length; i < len; i++) {
                var elem = toggleList[i], selector = getSelectorFromElement(elem), filterElement = SelectorEngine.find(selector).filter(function(foundElem) {
                    return foundElem === element;
                });
                null !== selector && filterElement.length && (this._selector = selector, this._triggerArray.push(elem));
            }
            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), 
            this._config.toggle && this.toggle(), Data.setData(element, DATA_KEY$3, this);
        }
        var _proto = Collapse.prototype;
        return _proto.toggle = function() {
            this._element.classList.contains(CLASS_NAME_SHOW) ? this.hide() : this.show();
        }, _proto.show = function() {
            var _this = this;
            if (!this._isTransitioning && !this._element.classList.contains(CLASS_NAME_SHOW)) {
                var actives, activesData;
                this._parent && (actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function(elem) {
                    return "string" == typeof _this._config.parent ? elem.getAttribute("data-parent") === _this._config.parent : elem.classList.contains(CLASS_NAME_COLLAPSE);
                }), 0 === actives.length && (actives = null));
                var container = SelectorEngine.findOne(this._selector);
                if (actives) {
                    var tempActiveData = actives.filter(function(elem) {
                        return container !== elem;
                    });
                    if (activesData = tempActiveData[0] ? Data.getData(tempActiveData[0], DATA_KEY$3) : null, 
                    activesData && activesData._isTransitioning) return;
                }
                var startEvent = EventHandler.trigger(this._element, EVENT_SHOW);
                if (!startEvent.defaultPrevented) {
                    actives && actives.forEach(function(elemActive) {
                        container !== elemActive && Collapse.collapseInterface(elemActive, "hide"), activesData || Data.setData(elemActive, DATA_KEY$3, null);
                    });
                    var dimension = this._getDimension();
                    this._element.classList.remove(CLASS_NAME_COLLAPSE), this._element.classList.add(CLASS_NAME_COLLAPSING), 
                    this._element.style[dimension] = 0, this._triggerArray.length && this._triggerArray.forEach(function(element) {
                        element.classList.remove(CLASS_NAME_COLLAPSED), element.setAttribute("aria-expanded", !0);
                    }), this.setTransitioning(!0);
                    var complete = function() {
                        _this._element.classList.remove(CLASS_NAME_COLLAPSING), _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW), 
                        _this._element.style[dimension] = "", _this.setTransitioning(!1), EventHandler.trigger(_this._element, EVENT_SHOWN);
                    }, capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1), scrollSize = "scroll" + capitalizedDimension, transitionDuration = getTransitionDurationFromElement(this._element);
                    EventHandler.one(this._element, TRANSITION_END, complete), emulateTransitionEnd(this._element, transitionDuration), 
                    this._element.style[dimension] = this._element[scrollSize] + "px";
                }
            }
        }, _proto.hide = function() {
            var _this2 = this;
            if (!this._isTransitioning && this._element.classList.contains(CLASS_NAME_SHOW)) {
                var startEvent = EventHandler.trigger(this._element, EVENT_HIDE);
                if (!startEvent.defaultPrevented) {
                    var dimension = this._getDimension();
                    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px", 
                    reflow(this._element), this._element.classList.add(CLASS_NAME_COLLAPSING), this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
                    var triggerArrayLength = this._triggerArray.length;
                    if (triggerArrayLength > 0) for (var i = 0; i < triggerArrayLength; i++) {
                        var trigger = this._triggerArray[i], elem = getElementFromSelector(trigger);
                        elem && !elem.classList.contains(CLASS_NAME_SHOW) && (trigger.classList.add(CLASS_NAME_COLLAPSED), 
                        trigger.setAttribute("aria-expanded", !1));
                    }
                    this.setTransitioning(!0);
                    var complete = function() {
                        _this2.setTransitioning(!1), _this2._element.classList.remove(CLASS_NAME_COLLAPSING), 
                        _this2._element.classList.add(CLASS_NAME_COLLAPSE), EventHandler.trigger(_this2._element, EVENT_HIDDEN);
                    };
                    this._element.style[dimension] = "";
                    var transitionDuration = getTransitionDurationFromElement(this._element);
                    EventHandler.one(this._element, TRANSITION_END, complete), emulateTransitionEnd(this._element, transitionDuration);
                }
            }
        }, _proto.setTransitioning = function(isTransitioning) {
            this._isTransitioning = isTransitioning;
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY$3), this._config = null, this._parent = null, 
            this._element = null, this._triggerArray = null, this._isTransitioning = null;
        }, _proto._getConfig = function(config) {
            return config = _objectSpread2(_objectSpread2({}, Default$1), config), config.toggle = Boolean(config.toggle), 
            typeCheckConfig(NAME$3, config, DefaultType$1), config;
        }, _proto._getDimension = function() {
            var hasWidth = this._element.classList.contains(WIDTH);
            return hasWidth ? WIDTH : HEIGHT;
        }, _proto._getParent = function() {
            var _this3 = this, parent = this._config.parent;
            isElement(parent) ? "undefined" == typeof parent.jquery && "undefined" == typeof parent[0] || (parent = parent[0]) : parent = SelectorEngine.findOne(parent);
            var selector = SELECTOR_DATA_TOGGLE$1 + '[data-parent="' + parent + '"]';
            return SelectorEngine.find(selector, parent).forEach(function(element) {
                var selected = getElementFromSelector(element);
                _this3._addAriaAndCollapsedClass(selected, [ element ]);
            }), parent;
        }, _proto._addAriaAndCollapsedClass = function(element, triggerArray) {
            if (element) {
                var isOpen = element.classList.contains(CLASS_NAME_SHOW);
                triggerArray.length && triggerArray.forEach(function(elem) {
                    isOpen ? elem.classList.remove(CLASS_NAME_COLLAPSED) : elem.classList.add(CLASS_NAME_COLLAPSED), 
                    elem.setAttribute("aria-expanded", isOpen);
                });
            }
        }, Collapse.collapseInterface = function(element, config) {
            var data = Data.getData(element, DATA_KEY$3), _config = _objectSpread2(_objectSpread2(_objectSpread2({}, Default$1), Manipulator.getDataAttributes(element)), "object" == typeof config && config ? config : {});
            if (!data && _config.toggle && "string" == typeof config && /show|hide/.test(config) && (_config.toggle = !1), 
            data || (data = new Collapse(element, _config)), "string" == typeof config) {
                if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                data[config]();
            }
        }, Collapse.jQueryInterface = function(config) {
            return this.each(function() {
                Collapse.collapseInterface(this, config);
            });
        }, Collapse.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$3);
        }, _createClass(Collapse, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$3;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$1;
            }
        } ]), Collapse;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function(event) {
        "A" === event.target.tagName && event.preventDefault();
        var triggerData = Manipulator.getDataAttributes(this), selector = getSelectorFromElement(this), selectorElements = SelectorEngine.find(selector);
        selectorElements.forEach(function(element) {
            var config, data = Data.getData(element, DATA_KEY$3);
            data ? (null === data._parent && "string" == typeof triggerData.parent && (data._config.parent = triggerData.parent, 
            data._parent = data._getParent()), config = "toggle") : config = triggerData, Collapse.collapseInterface(element, config);
        });
    });
    var $$4 = getjQuery();
    if ($$4) {
        var JQUERY_NO_CONFLICT$3 = $$4.fn[NAME$3];
        $$4.fn[NAME$3] = Collapse.jQueryInterface, $$4.fn[NAME$3].Constructor = Collapse, 
        $$4.fn[NAME$3].noConflict = function() {
            return $$4.fn[NAME$3] = JQUERY_NO_CONFLICT$3, Collapse.jQueryInterface;
        };
    }
    var NAME$4 = "dropdown", VERSION$4 = "5.0.0-alpha1", DATA_KEY$4 = "bs.dropdown", EVENT_KEY$4 = "." + DATA_KEY$4, DATA_API_KEY$4 = ".data-api", ESCAPE_KEY = "Escape", SPACE_KEY = "Space", TAB_KEY = "Tab", ARROW_UP_KEY = "ArrowUp", ARROW_DOWN_KEY = "ArrowDown", RIGHT_MOUSE_BUTTON = 2, REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + "|" + ARROW_DOWN_KEY + "|" + ESCAPE_KEY), EVENT_HIDE$1 = "hide" + EVENT_KEY$4, EVENT_HIDDEN$1 = "hidden" + EVENT_KEY$4, EVENT_SHOW$1 = "show" + EVENT_KEY$4, EVENT_SHOWN$1 = "shown" + EVENT_KEY$4, EVENT_CLICK = "click" + EVENT_KEY$4, EVENT_CLICK_DATA_API$4 = "click" + EVENT_KEY$4 + DATA_API_KEY$4, EVENT_KEYDOWN_DATA_API = "keydown" + EVENT_KEY$4 + DATA_API_KEY$4, EVENT_KEYUP_DATA_API = "keyup" + EVENT_KEY$4 + DATA_API_KEY$4, CLASS_NAME_DISABLED = "disabled", CLASS_NAME_SHOW$1 = "show", CLASS_NAME_DROPUP = "dropup", CLASS_NAME_DROPRIGHT = "dropright", CLASS_NAME_DROPLEFT = "dropleft", CLASS_NAME_MENURIGHT = "dropdown-menu-right", CLASS_NAME_NAVBAR = "navbar", CLASS_NAME_POSITION_STATIC = "position-static", SELECTOR_DATA_TOGGLE$2 = '[data-toggle="dropdown"]', SELECTOR_FORM_CHILD = ".dropdown form", SELECTOR_MENU = ".dropdown-menu", SELECTOR_NAVBAR_NAV = ".navbar-nav", SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", PLACEMENT_TOP = "top-start", PLACEMENT_TOPEND = "top-end", PLACEMENT_BOTTOM = "bottom-start", PLACEMENT_BOTTOMEND = "bottom-end", PLACEMENT_RIGHT = "right-start", PLACEMENT_LEFT = "left-start", Default$2 = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null
    }, DefaultType$2 = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)"
    }, Dropdown = function() {
        function Dropdown(element, config) {
            this._element = element, this._popper = null, this._config = this._getConfig(config), 
            this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), 
            Data.setData(element, DATA_KEY$4, this);
        }
        var _proto = Dropdown.prototype;
        return _proto.toggle = function() {
            if (!this._element.disabled && !this._element.classList.contains(CLASS_NAME_DISABLED)) {
                var isActive = this._element.classList.contains(CLASS_NAME_SHOW$1);
                Dropdown.clearMenus(), isActive || this.show();
            }
        }, _proto.show = function() {
            if (!(this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$1))) {
                var parent = Dropdown.getParentFromElement(this._element), relatedTarget = {
                    relatedTarget: this._element
                }, showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);
                if (!showEvent.defaultPrevented) {
                    if (!this._inNavbar) {
                        if ("undefined" == typeof Popper) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
                        var referenceElement = this._element;
                        "parent" === this._config.reference ? referenceElement = parent : isElement(this._config.reference) && (referenceElement = this._config.reference, 
                        "undefined" != typeof this._config.reference.jquery && (referenceElement = this._config.reference[0])), 
                        "scrollParent" !== this._config.boundary && parent.classList.add(CLASS_NAME_POSITION_STATIC), 
                        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
                    }
                    if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
                        var _ref;
                        (_ref = []).concat.apply(_ref, document.body.children).forEach(function(elem) {
                            return EventHandler.on(elem, "mouseover", null, noop());
                        });
                    }
                    this._element.focus(), this._element.setAttribute("aria-expanded", !0), Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1), 
                    Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1), EventHandler.trigger(parent, EVENT_SHOWN$1, relatedTarget);
                }
            }
        }, _proto.hide = function() {
            if (!this._element.disabled && !this._element.classList.contains(CLASS_NAME_DISABLED) && this._menu.classList.contains(CLASS_NAME_SHOW$1)) {
                var parent = Dropdown.getParentFromElement(this._element), relatedTarget = {
                    relatedTarget: this._element
                }, hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
                hideEvent.defaultPrevented || (this._popper && this._popper.destroy(), Manipulator.toggleClass(this._menu, CLASS_NAME_SHOW$1), 
                Manipulator.toggleClass(this._element, CLASS_NAME_SHOW$1), EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget));
            }
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY$4), EventHandler.off(this._element, EVENT_KEY$4), 
            this._element = null, this._menu = null, this._popper && (this._popper.destroy(), 
            this._popper = null);
        }, _proto.update = function() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate();
        }, _proto._addEventListeners = function() {
            var _this = this;
            EventHandler.on(this._element, EVENT_CLICK, function(event) {
                event.preventDefault(), event.stopPropagation(), _this.toggle();
            });
        }, _proto._getConfig = function(config) {
            return config = _objectSpread2(_objectSpread2(_objectSpread2({}, this.constructor.Default), Manipulator.getDataAttributes(this._element)), config), 
            typeCheckConfig(NAME$4, config, this.constructor.DefaultType), config;
        }, _proto._getMenuElement = function() {
            return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
        }, _proto._getPlacement = function() {
            var parentDropdown = this._element.parentNode, placement = PLACEMENT_BOTTOM;
            return parentDropdown.classList.contains(CLASS_NAME_DROPUP) ? (placement = PLACEMENT_TOP, 
            this._menu.classList.contains(CLASS_NAME_MENURIGHT) && (placement = PLACEMENT_TOPEND)) : parentDropdown.classList.contains(CLASS_NAME_DROPRIGHT) ? placement = PLACEMENT_RIGHT : parentDropdown.classList.contains(CLASS_NAME_DROPLEFT) ? placement = PLACEMENT_LEFT : this._menu.classList.contains(CLASS_NAME_MENURIGHT) && (placement = PLACEMENT_BOTTOMEND), 
            placement;
        }, _proto._detectNavbar = function() {
            return Boolean(this._element.closest("." + CLASS_NAME_NAVBAR));
        }, _proto._getOffset = function() {
            var _this2 = this, offset = {};
            return "function" == typeof this._config.offset ? offset.fn = function(data) {
                return data.offsets = _objectSpread2(_objectSpread2({}, data.offsets), _this2._config.offset(data.offsets, _this2._element) || {}), 
                data;
            } : offset.offset = this._config.offset, offset;
        }, _proto._getPopperConfig = function() {
            var popperConfig = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            return "static" === this._config.display && (popperConfig.modifiers.applyStyle = {
                enabled: !1
            }), _objectSpread2(_objectSpread2({}, popperConfig), this._config.popperConfig);
        }, Dropdown.dropdownInterface = function(element, config) {
            var data = Data.getData(element, DATA_KEY$4), _config = "object" == typeof config ? config : null;
            if (data || (data = new Dropdown(element, _config)), "string" == typeof config) {
                if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                data[config]();
            }
        }, Dropdown.jQueryInterface = function(config) {
            return this.each(function() {
                Dropdown.dropdownInterface(this, config);
            });
        }, Dropdown.clearMenus = function(event) {
            if (!event || event.button !== RIGHT_MOUSE_BUTTON && ("keyup" !== event.type || event.key === TAB_KEY)) for (var toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2), i = 0, len = toggles.length; i < len; i++) {
                var parent = Dropdown.getParentFromElement(toggles[i]), context = Data.getData(toggles[i], DATA_KEY$4), relatedTarget = {
                    relatedTarget: toggles[i]
                };
                if (event && "click" === event.type && (relatedTarget.clickEvent = event), context) {
                    var dropdownMenu = context._menu;
                    if (toggles[i].classList.contains(CLASS_NAME_SHOW$1) && !(event && ("click" === event.type && /input|textarea/i.test(event.target.tagName) || "keyup" === event.type && event.key === TAB_KEY) && dropdownMenu.contains(event.target))) {
                        var hideEvent = EventHandler.trigger(parent, EVENT_HIDE$1, relatedTarget);
                        if (!hideEvent.defaultPrevented) {
                            if ("ontouchstart" in document.documentElement) {
                                var _ref2;
                                (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function(elem) {
                                    return EventHandler.off(elem, "mouseover", null, noop());
                                });
                            }
                            toggles[i].setAttribute("aria-expanded", "false"), context._popper && context._popper.destroy(), 
                            dropdownMenu.classList.remove(CLASS_NAME_SHOW$1), toggles[i].classList.remove(CLASS_NAME_SHOW$1), 
                            EventHandler.trigger(parent, EVENT_HIDDEN$1, relatedTarget);
                        }
                    }
                }
            }
        }, Dropdown.getParentFromElement = function(element) {
            return getElementFromSelector(element) || element.parentNode;
        }, Dropdown.dataApiKeydownHandler = function(event) {
            if ((/input|textarea/i.test(event.target.tagName) ? !(event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU))) : REGEXP_KEYDOWN.test(event.key)) && (event.preventDefault(), 
            event.stopPropagation(), !this.disabled && !this.classList.contains(CLASS_NAME_DISABLED))) {
                var parent = Dropdown.getParentFromElement(this), isActive = this.classList.contains(CLASS_NAME_SHOW$1);
                if (event.key === ESCAPE_KEY) {
                    var button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
                    return button.focus(), void Dropdown.clearMenus();
                }
                if (!isActive || event.key === SPACE_KEY) return void Dropdown.clearMenus();
                var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);
                if (items.length) {
                    var index = items.indexOf(event.target);
                    event.key === ARROW_UP_KEY && index > 0 && index--, event.key === ARROW_DOWN_KEY && index < items.length - 1 && index++, 
                    index = index === -1 ? 0 : index, items[index].focus();
                }
            }
        }, Dropdown.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$4);
        }, _createClass(Dropdown, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$4;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$2;
            }
        }, {
            key: "DefaultType",
            get: function() {
                return DefaultType$2;
            }
        } ]), Dropdown;
    }();
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler), 
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler), 
    EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus), EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus), 
    EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function(event) {
        event.preventDefault(), event.stopPropagation(), Dropdown.dropdownInterface(this, "toggle");
    }), EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function(e) {
        return e.stopPropagation();
    });
    var $$5 = getjQuery();
    if ($$5) {
        var JQUERY_NO_CONFLICT$4 = $$5.fn[NAME$4];
        $$5.fn[NAME$4] = Dropdown.jQueryInterface, $$5.fn[NAME$4].Constructor = Dropdown, 
        $$5.fn[NAME$4].noConflict = function() {
            return $$5.fn[NAME$4] = JQUERY_NO_CONFLICT$4, Dropdown.jQueryInterface;
        };
    }
    var NAME$5 = "modal", VERSION$5 = "5.0.0-alpha1", DATA_KEY$5 = "bs.modal", EVENT_KEY$5 = "." + DATA_KEY$5, DATA_API_KEY$5 = ".data-api", ESCAPE_KEY$1 = "Escape", Default$3 = {
        backdrop: !0,
        keyboard: !0,
        focus: !0,
        show: !0
    }, DefaultType$3 = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean"
    }, EVENT_HIDE$2 = "hide" + EVENT_KEY$5, EVENT_HIDE_PREVENTED = "hidePrevented" + EVENT_KEY$5, EVENT_HIDDEN$2 = "hidden" + EVENT_KEY$5, EVENT_SHOW$2 = "show" + EVENT_KEY$5, EVENT_SHOWN$2 = "shown" + EVENT_KEY$5, EVENT_FOCUSIN = "focusin" + EVENT_KEY$5, EVENT_RESIZE = "resize" + EVENT_KEY$5, EVENT_CLICK_DISMISS = "click.dismiss" + EVENT_KEY$5, EVENT_KEYDOWN_DISMISS = "keydown.dismiss" + EVENT_KEY$5, EVENT_MOUSEUP_DISMISS = "mouseup.dismiss" + EVENT_KEY$5, EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss" + EVENT_KEY$5, EVENT_CLICK_DATA_API$5 = "click" + EVENT_KEY$5 + DATA_API_KEY$5, CLASS_NAME_SCROLLBAR_MEASURER = "modal-scrollbar-measure", CLASS_NAME_BACKDROP = "modal-backdrop", CLASS_NAME_OPEN = "modal-open", CLASS_NAME_FADE = "fade", CLASS_NAME_SHOW$2 = "show", CLASS_NAME_STATIC = "modal-static", SELECTOR_DIALOG = ".modal-dialog", SELECTOR_MODAL_BODY = ".modal-body", SELECTOR_DATA_TOGGLE$3 = '[data-toggle="modal"]', SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]', SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", SELECTOR_STICKY_CONTENT = ".sticky-top", Modal = function() {
        function Modal(element, config) {
            this._config = this._getConfig(config), this._element = element, this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element), 
            this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, 
            this._isTransitioning = !1, this._scrollbarWidth = 0, Data.setData(element, DATA_KEY$5, this);
        }
        var _proto = Modal.prototype;
        return _proto.toggle = function(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        }, _proto.show = function(relatedTarget) {
            var _this = this;
            if (!this._isShown && !this._isTransitioning) {
                this._element.classList.contains(CLASS_NAME_FADE) && (this._isTransitioning = !0);
                var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
                    relatedTarget: relatedTarget
                });
                this._isShown || showEvent.defaultPrevented || (this._isShown = !0, this._checkScrollbar(), 
                this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), 
                EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function(event) {
                    return _this.hide(event);
                }), EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function() {
                    EventHandler.one(_this._element, EVENT_MOUSEUP_DISMISS, function(event) {
                        event.target === _this._element && (_this._ignoreBackdropClick = !0);
                    });
                }), this._showBackdrop(function() {
                    return _this._showElement(relatedTarget);
                }));
            }
        }, _proto.hide = function(event) {
            var _this2 = this;
            if (event && event.preventDefault(), this._isShown && !this._isTransitioning) {
                var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);
                if (!hideEvent.defaultPrevented) {
                    this._isShown = !1;
                    var transition = this._element.classList.contains(CLASS_NAME_FADE);
                    if (transition && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), 
                    EventHandler.off(document, EVENT_FOCUSIN), this._element.classList.remove(CLASS_NAME_SHOW$2), 
                    EventHandler.off(this._element, EVENT_CLICK_DISMISS), EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS), 
                    transition) {
                        var transitionDuration = getTransitionDurationFromElement(this._element);
                        EventHandler.one(this._element, TRANSITION_END, function(event) {
                            return _this2._hideModal(event);
                        }), emulateTransitionEnd(this._element, transitionDuration);
                    } else this._hideModal();
                }
            }
        }, _proto.dispose = function() {
            [ window, this._element, this._dialog ].forEach(function(htmlElement) {
                return EventHandler.off(htmlElement, EVENT_KEY$5);
            }), EventHandler.off(document, EVENT_FOCUSIN), Data.removeData(this._element, DATA_KEY$5), 
            this._config = null, this._element = null, this._dialog = null, this._backdrop = null, 
            this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, 
            this._isTransitioning = null, this._scrollbarWidth = null;
        }, _proto.handleUpdate = function() {
            this._adjustDialog();
        }, _proto._getConfig = function(config) {
            return config = _objectSpread2(_objectSpread2({}, Default$3), config), typeCheckConfig(NAME$5, config, DefaultType$3), 
            config;
        }, _proto._showElement = function(relatedTarget) {
            var _this3 = this, transition = this._element.classList.contains(CLASS_NAME_FADE), modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), 
            this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), 
            this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), 
            this._element.scrollTop = 0, modalBody && (modalBody.scrollTop = 0), transition && reflow(this._element), 
            this._element.classList.add(CLASS_NAME_SHOW$2), this._config.focus && this._enforceFocus();
            var transitionComplete = function() {
                _this3._config.focus && _this3._element.focus(), _this3._isTransitioning = !1, EventHandler.trigger(_this3._element, EVENT_SHOWN$2, {
                    relatedTarget: relatedTarget
                });
            };
            if (transition) {
                var transitionDuration = getTransitionDurationFromElement(this._dialog);
                EventHandler.one(this._dialog, TRANSITION_END, transitionComplete), emulateTransitionEnd(this._dialog, transitionDuration);
            } else transitionComplete();
        }, _proto._enforceFocus = function() {
            var _this4 = this;
            EventHandler.off(document, EVENT_FOCUSIN), EventHandler.on(document, EVENT_FOCUSIN, function(event) {
                document === event.target || _this4._element === event.target || _this4._element.contains(event.target) || _this4._element.focus();
            });
        }, _proto._setEscapeEvent = function() {
            var _this5 = this;
            this._isShown ? EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function(event) {
                _this5._config.keyboard && event.key === ESCAPE_KEY$1 ? (event.preventDefault(), 
                _this5.hide()) : _this5._config.keyboard || event.key !== ESCAPE_KEY$1 || _this5._triggerBackdropTransition();
            }) : EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
        }, _proto._setResizeEvent = function() {
            var _this6 = this;
            this._isShown ? EventHandler.on(window, EVENT_RESIZE, function() {
                return _this6._adjustDialog();
            }) : EventHandler.off(window, EVENT_RESIZE);
        }, _proto._hideModal = function() {
            var _this7 = this;
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), 
            this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), 
            this._isTransitioning = !1, this._showBackdrop(function() {
                document.body.classList.remove(CLASS_NAME_OPEN), _this7._resetAdjustments(), _this7._resetScrollbar(), 
                EventHandler.trigger(_this7._element, EVENT_HIDDEN$2);
            });
        }, _proto._removeBackdrop = function() {
            this._backdrop.parentNode.removeChild(this._backdrop), this._backdrop = null;
        }, _proto._showBackdrop = function(callback) {
            var _this8 = this, animate = this._element.classList.contains(CLASS_NAME_FADE) ? CLASS_NAME_FADE : "";
            if (this._isShown && this._config.backdrop) {
                if (this._backdrop = document.createElement("div"), this._backdrop.className = CLASS_NAME_BACKDROP, 
                animate && this._backdrop.classList.add(animate), document.body.appendChild(this._backdrop), 
                EventHandler.on(this._element, EVENT_CLICK_DISMISS, function(event) {
                    return _this8._ignoreBackdropClick ? void (_this8._ignoreBackdropClick = !1) : void (event.target === event.currentTarget && _this8._triggerBackdropTransition());
                }), animate && reflow(this._backdrop), this._backdrop.classList.add(CLASS_NAME_SHOW$2), 
                !animate) return void callback();
                var backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
                EventHandler.one(this._backdrop, TRANSITION_END, callback), emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
            } else if (!this._isShown && this._backdrop) {
                this._backdrop.classList.remove(CLASS_NAME_SHOW$2);
                var callbackRemove = function() {
                    _this8._removeBackdrop(), callback();
                };
                if (this._element.classList.contains(CLASS_NAME_FADE)) {
                    var _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
                    EventHandler.one(this._backdrop, TRANSITION_END, callbackRemove), emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
                } else callbackRemove();
            } else callback();
        }, _proto._triggerBackdropTransition = function() {
            var _this9 = this;
            if ("static" === this._config.backdrop) {
                var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
                if (hideEvent.defaultPrevented) return;
                this._element.classList.add(CLASS_NAME_STATIC);
                var modalTransitionDuration = getTransitionDurationFromElement(this._element);
                EventHandler.one(this._element, TRANSITION_END, function() {
                    _this9._element.classList.remove(CLASS_NAME_STATIC);
                }), emulateTransitionEnd(this._element, modalTransitionDuration), this._element.focus();
            } else this.hide();
        }, _proto._adjustDialog = function() {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && isModalOverflowing && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), 
            this._isBodyOverflowing && !isModalOverflowing && (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }, _proto._resetAdjustments = function() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
        }, _proto._checkScrollbar = function() {
            var rect = document.body.getBoundingClientRect();
            this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth, 
            this._scrollbarWidth = this._getScrollbarWidth();
        }, _proto._setScrollbar = function() {
            var _this10 = this;
            if (this._isBodyOverflowing) {
                SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function(element) {
                    var actualPadding = element.style.paddingRight, calculatedPadding = window.getComputedStyle(element)["padding-right"];
                    Manipulator.setDataAttribute(element, "padding-right", actualPadding), element.style.paddingRight = parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px";
                }), SelectorEngine.find(SELECTOR_STICKY_CONTENT).forEach(function(element) {
                    var actualMargin = element.style.marginRight, calculatedMargin = window.getComputedStyle(element)["margin-right"];
                    Manipulator.setDataAttribute(element, "margin-right", actualMargin), element.style.marginRight = parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px";
                });
                var actualPadding = document.body.style.paddingRight, calculatedPadding = window.getComputedStyle(document.body)["padding-right"];
                Manipulator.setDataAttribute(document.body, "padding-right", actualPadding), document.body.style.paddingRight = parseFloat(calculatedPadding) + this._scrollbarWidth + "px";
            }
            document.body.classList.add(CLASS_NAME_OPEN);
        }, _proto._resetScrollbar = function() {
            SelectorEngine.find(SELECTOR_FIXED_CONTENT).forEach(function(element) {
                var padding = Manipulator.getDataAttribute(element, "padding-right");
                "undefined" != typeof padding && (Manipulator.removeDataAttribute(element, "padding-right"), 
                element.style.paddingRight = padding);
            }), SelectorEngine.find("" + SELECTOR_STICKY_CONTENT).forEach(function(element) {
                var margin = Manipulator.getDataAttribute(element, "margin-right");
                "undefined" != typeof margin && (Manipulator.removeDataAttribute(element, "margin-right"), 
                element.style.marginRight = margin);
            });
            var padding = Manipulator.getDataAttribute(document.body, "padding-right");
            "undefined" == typeof padding ? document.body.style.paddingRight = "" : (Manipulator.removeDataAttribute(document.body, "padding-right"), 
            document.body.style.paddingRight = padding);
        }, _proto._getScrollbarWidth = function() {
            var scrollDiv = document.createElement("div");
            scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER, document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
            return document.body.removeChild(scrollDiv), scrollbarWidth;
        }, Modal.jQueryInterface = function(config, relatedTarget) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$5), _config = _objectSpread2(_objectSpread2(_objectSpread2({}, Default$3), Manipulator.getDataAttributes(this)), "object" == typeof config && config ? config : {});
                if (data || (data = new Modal(this, _config)), "string" == typeof config) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config](relatedTarget);
                } else _config.show && data.show(relatedTarget);
            });
        }, Modal.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$5);
        }, _createClass(Modal, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$5;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$3;
            }
        } ]), Modal;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function(event) {
        var _this11 = this, target = getElementFromSelector(this);
        "A" !== this.tagName && "AREA" !== this.tagName || event.preventDefault(), EventHandler.one(target, EVENT_SHOW$2, function(showEvent) {
            showEvent.defaultPrevented || EventHandler.one(target, EVENT_HIDDEN$2, function() {
                isVisible(_this11) && _this11.focus();
            });
        });
        var data = Data.getData(target, DATA_KEY$5);
        if (!data) {
            var config = _objectSpread2(_objectSpread2({}, Manipulator.getDataAttributes(target)), Manipulator.getDataAttributes(this));
            data = new Modal(target, config);
        }
        data.show(this);
    });
    var $$6 = getjQuery();
    if ($$6) {
        var JQUERY_NO_CONFLICT$5 = $$6.fn[NAME$5];
        $$6.fn[NAME$5] = Modal.jQueryInterface, $$6.fn[NAME$5].Constructor = Modal, $$6.fn[NAME$5].noConflict = function() {
            return $$6.fn[NAME$5] = JQUERY_NO_CONFLICT$5, Modal.jQueryInterface;
        };
    }
    var uriAttrs = [ "background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href" ], ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i, SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi, DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i, allowedAttribute = function(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();
        if (allowedAttributeList.indexOf(attrName) !== -1) return uriAttrs.indexOf(attrName) === -1 || Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
        for (var regExp = allowedAttributeList.filter(function(attrRegex) {
            return attrRegex instanceof RegExp;
        }), i = 0, len = regExp.length; i < len; i++) if (attrName.match(regExp[i])) return !0;
        return !1;
    }, DefaultWhitelist = {
        "*": [ "class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN ],
        a: [ "target", "href", "title", "rel" ],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: [ "src", "srcset", "alt", "title", "width", "height" ],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    }, NAME$6 = "tooltip", VERSION$6 = "5.0.0-alpha1", DATA_KEY$6 = "bs.tooltip", EVENT_KEY$6 = "." + DATA_KEY$6, CLASS_PREFIX = "bs-tooltip", BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", "g"), DISALLOWED_ATTRIBUTES = [ "sanitize", "whiteList", "sanitizeFn" ], DefaultType$4 = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)"
    }, AttachmentMap = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left"
    }, Default$4 = {
        animation: !0,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: DefaultWhitelist,
        popperConfig: null
    }, Event$1 = {
        HIDE: "hide" + EVENT_KEY$6,
        HIDDEN: "hidden" + EVENT_KEY$6,
        SHOW: "show" + EVENT_KEY$6,
        SHOWN: "shown" + EVENT_KEY$6,
        INSERTED: "inserted" + EVENT_KEY$6,
        CLICK: "click" + EVENT_KEY$6,
        FOCUSIN: "focusin" + EVENT_KEY$6,
        FOCUSOUT: "focusout" + EVENT_KEY$6,
        MOUSEENTER: "mouseenter" + EVENT_KEY$6,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$6
    }, CLASS_NAME_FADE$1 = "fade", CLASS_NAME_MODAL = "modal", CLASS_NAME_SHOW$3 = "show", HOVER_STATE_SHOW = "show", HOVER_STATE_OUT = "out", SELECTOR_TOOLTIP_INNER = ".tooltip-inner", TRIGGER_HOVER = "hover", TRIGGER_FOCUS = "focus", TRIGGER_CLICK = "click", TRIGGER_MANUAL = "manual", Tooltip = function() {
        function Tooltip(element, config) {
            if ("undefined" == typeof Popper) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org)");
            this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, 
            this._popper = null, this.element = element, this.config = this._getConfig(config), 
            this.tip = null, this._setListeners(), Data.setData(element, this.constructor.DATA_KEY, this);
        }
        var _proto = Tooltip.prototype;
        return _proto.enable = function() {
            this._isEnabled = !0;
        }, _proto.disable = function() {
            this._isEnabled = !1;
        }, _proto.toggleEnabled = function() {
            this._isEnabled = !this._isEnabled;
        }, _proto.toggle = function(event) {
            if (this._isEnabled) if (event) {
                var dataKey = this.constructor.DATA_KEY, context = Data.getData(event.target, dataKey);
                context || (context = new this.constructor(event.target, this._getDelegateConfig()), 
                Data.setData(event.target, dataKey, context)), context._activeTrigger.click = !context._activeTrigger.click, 
                context._isWithActiveTrigger() ? context._enter(null, context) : context._leave(null, context);
            } else {
                if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) return void this._leave(null, this);
                this._enter(null, this);
            }
        }, _proto.dispose = function() {
            clearTimeout(this._timeout), Data.removeData(this.element, this.constructor.DATA_KEY), 
            EventHandler.off(this.element, this.constructor.EVENT_KEY), EventHandler.off(this.element.closest("." + CLASS_NAME_MODAL), "hide.bs.modal", this._hideModalHandler), 
            this.tip && this.tip.parentNode.removeChild(this.tip), this._isEnabled = null, this._timeout = null, 
            this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), 
            this._popper = null, this.element = null, this.config = null, this.tip = null;
        }, _proto.show = function() {
            var _this = this;
            if ("none" === this.element.style.display) throw new Error("Please use show on visible elements");
            if (this.isWithContent() && this._isEnabled) {
                var showEvent = EventHandler.trigger(this.element, this.constructor.Event.SHOW), shadowRoot = findShadowRoot(this.element), isInTheDom = null === shadowRoot ? this.element.ownerDocument.documentElement.contains(this.element) : shadowRoot.contains(this.element);
                if (showEvent.defaultPrevented || !isInTheDom) return;
                var tip = this.getTipElement(), tipId = getUID(this.constructor.NAME);
                tip.setAttribute("id", tipId), this.element.setAttribute("aria-describedby", tipId), 
                this.setContent(), this.config.animation && tip.classList.add(CLASS_NAME_FADE$1);
                var placement = "function" == typeof this.config.placement ? this.config.placement.call(this, tip, this.element) : this.config.placement, attachment = this._getAttachment(placement);
                this._addAttachmentClass(attachment);
                var container = this._getContainer();
                if (Data.setData(tip, this.constructor.DATA_KEY, this), this.element.ownerDocument.documentElement.contains(this.tip) || container.appendChild(tip), 
                EventHandler.trigger(this.element, this.constructor.Event.INSERTED), this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment)), 
                tip.classList.add(CLASS_NAME_SHOW$3), "ontouchstart" in document.documentElement) {
                    var _ref;
                    (_ref = []).concat.apply(_ref, document.body.children).forEach(function(element) {
                        EventHandler.on(element, "mouseover", noop());
                    });
                }
                var complete = function() {
                    _this.config.animation && _this._fixTransition();
                    var prevHoverState = _this._hoverState;
                    _this._hoverState = null, EventHandler.trigger(_this.element, _this.constructor.Event.SHOWN), 
                    prevHoverState === HOVER_STATE_OUT && _this._leave(null, _this);
                };
                if (this.tip.classList.contains(CLASS_NAME_FADE$1)) {
                    var transitionDuration = getTransitionDurationFromElement(this.tip);
                    EventHandler.one(this.tip, TRANSITION_END, complete), emulateTransitionEnd(this.tip, transitionDuration);
                } else complete();
            }
        }, _proto.hide = function() {
            var _this2 = this, tip = this.getTipElement(), complete = function() {
                _this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode && tip.parentNode.removeChild(tip), 
                _this2._cleanTipClass(), _this2.element.removeAttribute("aria-describedby"), EventHandler.trigger(_this2.element, _this2.constructor.Event.HIDDEN), 
                _this2._popper.destroy();
            }, hideEvent = EventHandler.trigger(this.element, this.constructor.Event.HIDE);
            if (!hideEvent.defaultPrevented) {
                if (tip.classList.remove(CLASS_NAME_SHOW$3), "ontouchstart" in document.documentElement) {
                    var _ref2;
                    (_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function(element) {
                        return EventHandler.off(element, "mouseover", noop);
                    });
                }
                if (this._activeTrigger[TRIGGER_CLICK] = !1, this._activeTrigger[TRIGGER_FOCUS] = !1, 
                this._activeTrigger[TRIGGER_HOVER] = !1, this.tip.classList.contains(CLASS_NAME_FADE$1)) {
                    var transitionDuration = getTransitionDurationFromElement(tip);
                    EventHandler.one(tip, TRANSITION_END, complete), emulateTransitionEnd(tip, transitionDuration);
                } else complete();
                this._hoverState = "";
            }
        }, _proto.update = function() {
            null !== this._popper && this._popper.scheduleUpdate();
        }, _proto.isWithContent = function() {
            return Boolean(this.getTitle());
        }, _proto.getTipElement = function() {
            if (this.tip) return this.tip;
            var element = document.createElement("div");
            return element.innerHTML = this.config.template, this.tip = element.children[0], 
            this.tip;
        }, _proto.setContent = function() {
            var tip = this.getTipElement();
            this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle()), 
            tip.classList.remove(CLASS_NAME_FADE$1, CLASS_NAME_SHOW$3);
        }, _proto.setElementContent = function(element, content) {
            if (null !== element) return "object" == typeof content && isElement(content) ? (content.jquery && (content = content[0]), 
            void (this.config.html ? content.parentNode !== element && (element.innerHTML = "", 
            element.appendChild(content)) : element.textContent = content.textContent)) : void (this.config.html ? (this.config.sanitize && (content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn)), 
            element.innerHTML = content) : element.textContent = content);
        }, _proto.getTitle = function() {
            var title = this.element.getAttribute("data-original-title");
            return title || (title = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), 
            title;
        }, _proto._getPopperConfig = function(attachment) {
            var _this3 = this, defaultBsConfig = {
                placement: attachment,
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        behavior: this.config.fallbackPlacement
                    },
                    arrow: {
                        element: "." + this.constructor.NAME + "-arrow"
                    },
                    preventOverflow: {
                        boundariesElement: this.config.boundary
                    }
                },
                onCreate: function(data) {
                    data.originalPlacement !== data.placement && _this3._handlePopperPlacementChange(data);
                },
                onUpdate: function(data) {
                    return _this3._handlePopperPlacementChange(data);
                }
            };
            return _objectSpread2(_objectSpread2({}, defaultBsConfig), this.config.popperConfig);
        }, _proto._addAttachmentClass = function(attachment) {
            this.getTipElement().classList.add(CLASS_PREFIX + "-" + attachment);
        }, _proto._getOffset = function() {
            var _this4 = this, offset = {};
            return "function" == typeof this.config.offset ? offset.fn = function(data) {
                return data.offsets = _objectSpread2(_objectSpread2({}, data.offsets), _this4.config.offset(data.offsets, _this4.element) || {}), 
                data;
            } : offset.offset = this.config.offset, offset;
        }, _proto._getContainer = function() {
            return this.config.container === !1 ? document.body : isElement(this.config.container) ? this.config.container : SelectorEngine.findOne(this.config.container);
        }, _proto._getAttachment = function(placement) {
            return AttachmentMap[placement.toUpperCase()];
        }, _proto._setListeners = function() {
            var _this5 = this, triggers = this.config.trigger.split(" ");
            triggers.forEach(function(trigger) {
                if ("click" === trigger) EventHandler.on(_this5.element, _this5.constructor.Event.CLICK, _this5.config.selector, function(event) {
                    return _this5.toggle(event);
                }); else if (trigger !== TRIGGER_MANUAL) {
                    var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN, eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
                    EventHandler.on(_this5.element, eventIn, _this5.config.selector, function(event) {
                        return _this5._enter(event);
                    }), EventHandler.on(_this5.element, eventOut, _this5.config.selector, function(event) {
                        return _this5._leave(event);
                    });
                }
            }), this._hideModalHandler = function() {
                _this5.element && _this5.hide();
            }, EventHandler.on(this.element.closest("." + CLASS_NAME_MODAL), "hide.bs.modal", this._hideModalHandler), 
            this.config.selector ? this.config = _objectSpread2(_objectSpread2({}, this.config), {}, {
                trigger: "manual",
                selector: ""
            }) : this._fixTitle();
        }, _proto._fixTitle = function() {
            var titleType = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== titleType) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), 
            this.element.setAttribute("title", ""));
        }, _proto._enter = function(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            return context = context || Data.getData(event.target, dataKey), context || (context = new this.constructor(event.target, this._getDelegateConfig()), 
            Data.setData(event.target, dataKey, context)), event && (context._activeTrigger["focusin" === event.type ? TRIGGER_FOCUS : TRIGGER_HOVER] = !0), 
            context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW ? void (context._hoverState = HOVER_STATE_SHOW) : (clearTimeout(context._timeout), 
            context._hoverState = HOVER_STATE_SHOW, context.config.delay && context.config.delay.show ? void (context._timeout = setTimeout(function() {
                context._hoverState === HOVER_STATE_SHOW && context.show();
            }, context.config.delay.show)) : void context.show());
        }, _proto._leave = function(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            if (context = context || Data.getData(event.target, dataKey), context || (context = new this.constructor(event.target, this._getDelegateConfig()), 
            Data.setData(event.target, dataKey, context)), event && (context._activeTrigger["focusout" === event.type ? TRIGGER_FOCUS : TRIGGER_HOVER] = !1), 
            !context._isWithActiveTrigger()) return clearTimeout(context._timeout), context._hoverState = HOVER_STATE_OUT, 
            context.config.delay && context.config.delay.hide ? void (context._timeout = setTimeout(function() {
                context._hoverState === HOVER_STATE_OUT && context.hide();
            }, context.config.delay.hide)) : void context.hide();
        }, _proto._isWithActiveTrigger = function() {
            for (var trigger in this._activeTrigger) if (this._activeTrigger[trigger]) return !0;
            return !1;
        }, _proto._getConfig = function(config) {
            var dataAttributes = Manipulator.getDataAttributes(this.element);
            return Object.keys(dataAttributes).forEach(function(dataAttr) {
                DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1 && delete dataAttributes[dataAttr];
            }), config && "object" == typeof config.container && config.container.jquery && (config.container = config.container[0]), 
            config = _objectSpread2(_objectSpread2(_objectSpread2({}, this.constructor.Default), dataAttributes), "object" == typeof config && config ? config : {}), 
            "number" == typeof config.delay && (config.delay = {
                show: config.delay,
                hide: config.delay
            }), "number" == typeof config.title && (config.title = config.title.toString()), 
            "number" == typeof config.content && (config.content = config.content.toString()), 
            typeCheckConfig(NAME$6, config, this.constructor.DefaultType), config.sanitize && (config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn)), 
            config;
        }, _proto._getDelegateConfig = function() {
            var config = {};
            if (this.config) for (var key in this.config) this.constructor.Default[key] !== this.config[key] && (config[key] = this.config[key]);
            return config;
        }, _proto._cleanTipClass = function() {
            var tip = this.getTipElement(), tabClass = tip.getAttribute("class").match(BSCLS_PREFIX_REGEX);
            null !== tabClass && tabClass.length > 0 && tabClass.map(function(token) {
                return token.trim();
            }).forEach(function(tClass) {
                return tip.classList.remove(tClass);
            });
        }, _proto._handlePopperPlacementChange = function(popperData) {
            var popperInstance = popperData.instance;
            this.tip = popperInstance.popper, this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(popperData.placement));
        }, _proto._fixTransition = function() {
            var tip = this.getTipElement(), initConfigAnimation = this.config.animation;
            null === tip.getAttribute("x-placement") && (tip.classList.remove(CLASS_NAME_FADE$1), 
            this.config.animation = !1, this.hide(), this.show(), this.config.animation = initConfigAnimation);
        }, Tooltip.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$6), _config = "object" == typeof config && config;
                if ((data || !/dispose|hide/.test(config)) && (data || (data = new Tooltip(this, _config)), 
                "string" == typeof config)) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config]();
                }
            });
        }, Tooltip.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$6);
        }, _createClass(Tooltip, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$6;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$4;
            }
        }, {
            key: "NAME",
            get: function() {
                return NAME$6;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return DATA_KEY$6;
            }
        }, {
            key: "Event",
            get: function() {
                return Event$1;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return EVENT_KEY$6;
            }
        }, {
            key: "DefaultType",
            get: function() {
                return DefaultType$4;
            }
        } ]), Tooltip;
    }(), $$7 = getjQuery();
    if ($$7) {
        var JQUERY_NO_CONFLICT$6 = $$7.fn[NAME$6];
        $$7.fn[NAME$6] = Tooltip.jQueryInterface, $$7.fn[NAME$6].Constructor = Tooltip, 
        $$7.fn[NAME$6].noConflict = function() {
            return $$7.fn[NAME$6] = JQUERY_NO_CONFLICT$6, Tooltip.jQueryInterface;
        };
    }
    var NAME$7 = "popover", VERSION$7 = "5.0.0-alpha1", DATA_KEY$7 = "bs.popover", EVENT_KEY$7 = "." + DATA_KEY$7, CLASS_PREFIX$1 = "bs-popover", BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", "g"), Default$5 = _objectSpread2(_objectSpread2({}, Tooltip.Default), {}, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    }), DefaultType$5 = _objectSpread2(_objectSpread2({}, Tooltip.DefaultType), {}, {
        content: "(string|element|function)"
    }), Event$2 = {
        HIDE: "hide" + EVENT_KEY$7,
        HIDDEN: "hidden" + EVENT_KEY$7,
        SHOW: "show" + EVENT_KEY$7,
        SHOWN: "shown" + EVENT_KEY$7,
        INSERTED: "inserted" + EVENT_KEY$7,
        CLICK: "click" + EVENT_KEY$7,
        FOCUSIN: "focusin" + EVENT_KEY$7,
        FOCUSOUT: "focusout" + EVENT_KEY$7,
        MOUSEENTER: "mouseenter" + EVENT_KEY$7,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    }, CLASS_NAME_FADE$2 = "fade", CLASS_NAME_SHOW$4 = "show", SELECTOR_TITLE = ".popover-header", SELECTOR_CONTENT = ".popover-body", Popover = function(_Tooltip) {
        function Popover() {
            return _Tooltip.apply(this, arguments) || this;
        }
        _inheritsLoose(Popover, _Tooltip);
        var _proto = Popover.prototype;
        return _proto.isWithContent = function() {
            return this.getTitle() || this._getContent();
        }, _proto.setContent = function() {
            var tip = this.getTipElement();
            this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());
            var content = this._getContent();
            "function" == typeof content && (content = content.call(this.element)), this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content), 
            tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
        }, _proto._addAttachmentClass = function(attachment) {
            this.getTipElement().classList.add(CLASS_PREFIX$1 + "-" + attachment);
        }, _proto._getContent = function() {
            return this.element.getAttribute("data-content") || this.config.content;
        }, _proto._cleanTipClass = function() {
            var tip = this.getTipElement(), tabClass = tip.getAttribute("class").match(BSCLS_PREFIX_REGEX$1);
            null !== tabClass && tabClass.length > 0 && tabClass.map(function(token) {
                return token.trim();
            }).forEach(function(tClass) {
                return tip.classList.remove(tClass);
            });
        }, Popover.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$7), _config = "object" == typeof config ? config : null;
                if ((data || !/dispose|hide/.test(config)) && (data || (data = new Popover(this, _config), 
                Data.setData(this, DATA_KEY$7, data)), "string" == typeof config)) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config]();
                }
            });
        }, Popover.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$7);
        }, _createClass(Popover, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$7;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$5;
            }
        }, {
            key: "NAME",
            get: function() {
                return NAME$7;
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return DATA_KEY$7;
            }
        }, {
            key: "Event",
            get: function() {
                return Event$2;
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return EVENT_KEY$7;
            }
        }, {
            key: "DefaultType",
            get: function() {
                return DefaultType$5;
            }
        } ]), Popover;
    }(Tooltip), $$8 = getjQuery();
    if ($$8) {
        var JQUERY_NO_CONFLICT$7 = $$8.fn[NAME$7];
        $$8.fn[NAME$7] = Popover.jQueryInterface, $$8.fn[NAME$7].Constructor = Popover, 
        $$8.fn[NAME$7].noConflict = function() {
            return $$8.fn[NAME$7] = JQUERY_NO_CONFLICT$7, Popover.jQueryInterface;
        };
    }
    var NAME$8 = "scrollspy", VERSION$8 = "5.0.0-alpha1", DATA_KEY$8 = "bs.scrollspy", EVENT_KEY$8 = "." + DATA_KEY$8, DATA_API_KEY$6 = ".data-api", Default$6 = {
        offset: 10,
        method: "auto",
        target: ""
    }, DefaultType$6 = {
        offset: "number",
        method: "string",
        target: "(string|element)"
    }, EVENT_ACTIVATE = "activate" + EVENT_KEY$8, EVENT_SCROLL = "scroll" + EVENT_KEY$8, EVENT_LOAD_DATA_API$1 = "load" + EVENT_KEY$8 + DATA_API_KEY$6, CLASS_NAME_DROPDOWN_ITEM = "dropdown-item", CLASS_NAME_ACTIVE$2 = "active", SELECTOR_DATA_SPY = '[data-spy="scroll"]', SELECTOR_NAV_LIST_GROUP = ".nav, .list-group", SELECTOR_NAV_LINKS = ".nav-link", SELECTOR_NAV_ITEMS = ".nav-item", SELECTOR_LIST_ITEMS = ".list-group-item", SELECTOR_DROPDOWN = ".dropdown", SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle", METHOD_OFFSET = "offset", METHOD_POSITION = "position", ScrollSpy = function() {
        function ScrollSpy(element, config) {
            var _this = this;
            this._element = element, this._scrollElement = "BODY" === element.tagName ? window : element, 
            this._config = this._getConfig(config), this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " ." + CLASS_NAME_DROPDOWN_ITEM), 
            this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, 
            EventHandler.on(this._scrollElement, EVENT_SCROLL, function(event) {
                return _this._process(event);
            }), this.refresh(), this._process(), Data.setData(element, DATA_KEY$8, this);
        }
        var _proto = ScrollSpy.prototype;
        return _proto.refresh = function() {
            var _this2 = this, autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION, offsetMethod = "auto" === this._config.method ? autoMethod : this._config.method, offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight();
            var targets = SelectorEngine.find(this._selector);
            targets.map(function(element) {
                var target, targetSelector = getSelectorFromElement(element);
                if (targetSelector && (target = SelectorEngine.findOne(targetSelector)), target) {
                    var targetBCR = target.getBoundingClientRect();
                    if (targetBCR.width || targetBCR.height) return [ Manipulator[offsetMethod](target).top + offsetBase, targetSelector ];
                }
                return null;
            }).filter(function(item) {
                return item;
            }).sort(function(a, b) {
                return a[0] - b[0];
            }).forEach(function(item) {
                _this2._offsets.push(item[0]), _this2._targets.push(item[1]);
            });
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY$8), EventHandler.off(this._scrollElement, EVENT_KEY$8), 
            this._element = null, this._scrollElement = null, this._config = null, this._selector = null, 
            this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
        }, _proto._getConfig = function(config) {
            if (config = _objectSpread2(_objectSpread2({}, Default$6), "object" == typeof config && config ? config : {}), 
            "string" != typeof config.target && isElement(config.target)) {
                var id = config.target.id;
                id || (id = getUID(NAME$8), config.target.id = id), config.target = "#" + id;
            }
            return typeCheckConfig(NAME$8, config, DefaultType$6), config;
        }, _proto._getScrollTop = function() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        }, _proto._getScrollHeight = function() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }, _proto._getOffsetHeight = function() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        }, _proto._process = function() {
            var scrollTop = this._getScrollTop() + this._config.offset, scrollHeight = this._getScrollHeight(), maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
            if (this._scrollHeight !== scrollHeight && this.refresh(), scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];
                return void (this._activeTarget !== target && this._activate(target));
            }
            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, 
            void this._clear();
            for (var i = this._offsets.length; i--; ) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && ("undefined" == typeof this._offsets[i + 1] || scrollTop < this._offsets[i + 1]);
                isActiveTarget && this._activate(this._targets[i]);
            }
        }, _proto._activate = function(target) {
            this._activeTarget = target, this._clear();
            var queries = this._selector.split(",").map(function(selector) {
                return selector + '[data-target="' + target + '"],' + selector + '[href="' + target + '"]';
            }), link = SelectorEngine.findOne(queries.join(","));
            link.classList.contains(CLASS_NAME_DROPDOWN_ITEM) ? (SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2), 
            link.classList.add(CLASS_NAME_ACTIVE$2)) : (link.classList.add(CLASS_NAME_ACTIVE$2), 
            SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function(listGroup) {
                SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).forEach(function(item) {
                    return item.classList.add(CLASS_NAME_ACTIVE$2);
                }), SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function(navItem) {
                    SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function(item) {
                        return item.classList.add(CLASS_NAME_ACTIVE$2);
                    });
                });
            })), EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
                relatedTarget: target
            });
        }, _proto._clear = function() {
            SelectorEngine.find(this._selector).filter(function(node) {
                return node.classList.contains(CLASS_NAME_ACTIVE$2);
            }).forEach(function(node) {
                return node.classList.remove(CLASS_NAME_ACTIVE$2);
            });
        }, ScrollSpy.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$8), _config = "object" == typeof config && config;
                if (data || (data = new ScrollSpy(this, _config)), "string" == typeof config) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config]();
                }
            });
        }, ScrollSpy.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$8);
        }, _createClass(ScrollSpy, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$8;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$6;
            }
        } ]), ScrollSpy;
    }();
    EventHandler.on(window, EVENT_LOAD_DATA_API$1, function() {
        SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function(spy) {
            return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
        });
    });
    var $$9 = getjQuery();
    if ($$9) {
        var JQUERY_NO_CONFLICT$8 = $$9.fn[NAME$8];
        $$9.fn[NAME$8] = ScrollSpy.jQueryInterface, $$9.fn[NAME$8].Constructor = ScrollSpy, 
        $$9.fn[NAME$8].noConflict = function() {
            return $$9.fn[NAME$8] = JQUERY_NO_CONFLICT$8, ScrollSpy.jQueryInterface;
        };
    }
    var NAME$9 = "tab", VERSION$9 = "5.0.0-alpha1", DATA_KEY$9 = "bs.tab", EVENT_KEY$9 = "." + DATA_KEY$9, DATA_API_KEY$7 = ".data-api", EVENT_HIDE$3 = "hide" + EVENT_KEY$9, EVENT_HIDDEN$3 = "hidden" + EVENT_KEY$9, EVENT_SHOW$3 = "show" + EVENT_KEY$9, EVENT_SHOWN$3 = "shown" + EVENT_KEY$9, EVENT_CLICK_DATA_API$6 = "click" + EVENT_KEY$9 + DATA_API_KEY$7, CLASS_NAME_DROPDOWN_MENU = "dropdown-menu", CLASS_NAME_ACTIVE$3 = "active", CLASS_NAME_DISABLED$1 = "disabled", CLASS_NAME_FADE$3 = "fade", CLASS_NAME_SHOW$5 = "show", SELECTOR_DROPDOWN$1 = ".dropdown", SELECTOR_NAV_LIST_GROUP$1 = ".nav, .list-group", SELECTOR_ACTIVE$1 = ".active", SELECTOR_ACTIVE_UL = ":scope > li > .active", SELECTOR_DATA_TOGGLE$4 = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle", SELECTOR_DROPDOWN_ACTIVE_CHILD = ":scope > .dropdown-menu .active", Tab = function() {
        function Tab(element) {
            this._element = element, Data.setData(this._element, DATA_KEY$9, this);
        }
        var _proto = Tab.prototype;
        return _proto.show = function() {
            var _this = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1))) {
                var previous, target = getElementFromSelector(this._element), listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);
                if (listElement) {
                    var itemSelector = "UL" === listElement.nodeName || "OL" === listElement.nodeName ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
                    previous = SelectorEngine.find(itemSelector, listElement), previous = previous[previous.length - 1];
                }
                var hideEvent = null;
                previous && (hideEvent = EventHandler.trigger(previous, EVENT_HIDE$3, {
                    relatedTarget: this._element
                }));
                var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
                    relatedTarget: previous
                });
                if (!(showEvent.defaultPrevented || null !== hideEvent && hideEvent.defaultPrevented)) {
                    this._activate(this._element, listElement);
                    var complete = function() {
                        EventHandler.trigger(previous, EVENT_HIDDEN$3, {
                            relatedTarget: _this._element
                        }), EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
                            relatedTarget: previous
                        });
                    };
                    target ? this._activate(target, target.parentNode, complete) : complete();
                }
            }
        }, _proto.dispose = function() {
            Data.removeData(this._element, DATA_KEY$9), this._element = null;
        }, _proto._activate = function(element, container, callback) {
            var _this2 = this, activeElements = !container || "UL" !== container.nodeName && "OL" !== container.nodeName ? SelectorEngine.children(container, SELECTOR_ACTIVE$1) : SelectorEngine.find(SELECTOR_ACTIVE_UL, container), active = activeElements[0], isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$3), complete = function() {
                return _this2._transitionComplete(element, active, callback);
            };
            if (active && isTransitioning) {
                var transitionDuration = getTransitionDurationFromElement(active);
                active.classList.remove(CLASS_NAME_SHOW$5), EventHandler.one(active, TRANSITION_END, complete), 
                emulateTransitionEnd(active, transitionDuration);
            } else complete();
        }, _proto._transitionComplete = function(element, active, callback) {
            if (active) {
                active.classList.remove(CLASS_NAME_ACTIVE$3);
                var dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);
                dropdownChild && dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3), "tab" === active.getAttribute("role") && active.setAttribute("aria-selected", !1);
            }
            if (element.classList.add(CLASS_NAME_ACTIVE$3), "tab" === element.getAttribute("role") && element.setAttribute("aria-selected", !0), 
            reflow(element), element.classList.contains(CLASS_NAME_FADE$3) && element.classList.add(CLASS_NAME_SHOW$5), 
            element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
                var dropdownElement = element.closest(SELECTOR_DROPDOWN$1);
                dropdownElement && SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function(dropdown) {
                    return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
                }), element.setAttribute("aria-expanded", !0);
            }
            callback && callback();
        }, Tab.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
                if ("string" == typeof config) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config]();
                }
            });
        }, Tab.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$9);
        }, _createClass(Tab, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$9;
            }
        } ]), Tab;
    }();
    EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function(event) {
        event.preventDefault();
        var data = Data.getData(this, DATA_KEY$9) || new Tab(this);
        data.show();
    });
    var $$a = getjQuery();
    if ($$a) {
        var JQUERY_NO_CONFLICT$9 = $$a.fn[NAME$9];
        $$a.fn[NAME$9] = Tab.jQueryInterface, $$a.fn[NAME$9].Constructor = Tab, $$a.fn[NAME$9].noConflict = function() {
            return $$a.fn[NAME$9] = JQUERY_NO_CONFLICT$9, Tab.jQueryInterface;
        };
    }
    var NAME$a = "toast", VERSION$a = "5.0.0-alpha1", DATA_KEY$a = "bs.toast", EVENT_KEY$a = "." + DATA_KEY$a, EVENT_CLICK_DISMISS$1 = "click.dismiss" + EVENT_KEY$a, EVENT_HIDE$4 = "hide" + EVENT_KEY$a, EVENT_HIDDEN$4 = "hidden" + EVENT_KEY$a, EVENT_SHOW$4 = "show" + EVENT_KEY$a, EVENT_SHOWN$4 = "shown" + EVENT_KEY$a, CLASS_NAME_FADE$4 = "fade", CLASS_NAME_HIDE = "hide", CLASS_NAME_SHOW$6 = "show", CLASS_NAME_SHOWING = "showing", DefaultType$7 = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    }, Default$7 = {
        animation: !0,
        autohide: !0,
        delay: 500
    }, SELECTOR_DATA_DISMISS$1 = '[data-dismiss="toast"]', Toast = function() {
        function Toast(element, config) {
            this._element = element, this._config = this._getConfig(config), this._timeout = null, 
            this._setListeners(), Data.setData(element, DATA_KEY$a, this);
        }
        var _proto = Toast.prototype;
        return _proto.show = function() {
            var _this = this, showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);
            if (!showEvent.defaultPrevented) {
                this._config.animation && this._element.classList.add(CLASS_NAME_FADE$4);
                var complete = function() {
                    _this._element.classList.remove(CLASS_NAME_SHOWING), _this._element.classList.add(CLASS_NAME_SHOW$6), 
                    EventHandler.trigger(_this._element, EVENT_SHOWN$4), _this._config.autohide && (_this._timeout = setTimeout(function() {
                        _this.hide();
                    }, _this._config.delay));
                };
                if (this._element.classList.remove(CLASS_NAME_HIDE), reflow(this._element), this._element.classList.add(CLASS_NAME_SHOWING), 
                this._config.animation) {
                    var transitionDuration = getTransitionDurationFromElement(this._element);
                    EventHandler.one(this._element, TRANSITION_END, complete), emulateTransitionEnd(this._element, transitionDuration);
                } else complete();
            }
        }, _proto.hide = function() {
            var _this2 = this;
            if (this._element.classList.contains(CLASS_NAME_SHOW$6)) {
                var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
                if (!hideEvent.defaultPrevented) {
                    var complete = function() {
                        _this2._element.classList.add(CLASS_NAME_HIDE), EventHandler.trigger(_this2._element, EVENT_HIDDEN$4);
                    };
                    if (this._element.classList.remove(CLASS_NAME_SHOW$6), this._config.animation) {
                        var transitionDuration = getTransitionDurationFromElement(this._element);
                        EventHandler.one(this._element, TRANSITION_END, complete), emulateTransitionEnd(this._element, transitionDuration);
                    } else complete();
                }
            }
        }, _proto.dispose = function() {
            clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(CLASS_NAME_SHOW$6) && this._element.classList.remove(CLASS_NAME_SHOW$6), 
            EventHandler.off(this._element, EVENT_CLICK_DISMISS$1), Data.removeData(this._element, DATA_KEY$a), 
            this._element = null, this._config = null;
        }, _proto._getConfig = function(config) {
            return config = _objectSpread2(_objectSpread2(_objectSpread2({}, Default$7), Manipulator.getDataAttributes(this._element)), "object" == typeof config && config ? config : {}), 
            typeCheckConfig(NAME$a, config, this.constructor.DefaultType), config;
        }, _proto._setListeners = function() {
            var _this3 = this;
            EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function() {
                return _this3.hide();
            });
        }, Toast.jQueryInterface = function(config) {
            return this.each(function() {
                var data = Data.getData(this, DATA_KEY$a), _config = "object" == typeof config && config;
                if (data || (data = new Toast(this, _config)), "string" == typeof config) {
                    if ("undefined" == typeof data[config]) throw new TypeError('No method named "' + config + '"');
                    data[config](this);
                }
            });
        }, Toast.getInstance = function(element) {
            return Data.getData(element, DATA_KEY$a);
        }, _createClass(Toast, null, [ {
            key: "VERSION",
            get: function() {
                return VERSION$a;
            }
        }, {
            key: "DefaultType",
            get: function() {
                return DefaultType$7;
            }
        }, {
            key: "Default",
            get: function() {
                return Default$7;
            }
        } ]), Toast;
    }(), $$b = getjQuery();
    if ($$b) {
        var JQUERY_NO_CONFLICT$a = $$b.fn[NAME$a];
        $$b.fn[NAME$a] = Toast.jQueryInterface, $$b.fn[NAME$a].Constructor = Toast, $$b.fn[NAME$a].noConflict = function() {
            return $$b.fn[NAME$a] = JQUERY_NO_CONFLICT$a, Toast.jQueryInterface;
        };
    }
    var index_umd = {
        Alert: Alert,
        Button: Button,
        Carousel: Carousel,
        Collapse: Collapse,
        Dropdown: Dropdown,
        Modal: Modal,
        Popover: Popover,
        ScrollSpy: ScrollSpy,
        Tab: Tab,
        Toast: Toast,
        Tooltip: Tooltip
    };
    return index_umd;
}), jQuery.noConflict()(function($) {
    "use strict";
    $(document).ready(function() {
        $("#cat").addClass("form-control"), $("select").addClass("form-control"), $("#wp-calendar").addClass("table table-hover"), 
        $("td a").addClass("badge").css("margin-right", "-10px");
    });
});
//# sourceMappingURL=index.js.map