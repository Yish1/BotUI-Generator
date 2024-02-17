(function(a, b) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return (a.BotUI = b(a))
        })
    } else {
        a.BotUI = b(a)
    }
}(typeof window !== 'undefined' ? window : this, function(o, p) {
    "use strict";
    var q = (function(f, g) {
        g = g || {};
        if (!f) {
            throw Error('BotUI: Container id is required as first argument.');
        }
        if (!document.getElementById(f)) {
            throw Error('BotUI: Element with id #' + f + ' does not exist.');
        }
        if (!o.Vue && !g.vue) {
            throw Error('BotUI: Vue is required but not found.');
        }
        var h, _options = {
            debug: false,
            fontawesome: true,
            searchselect: true
        }, _container, _interface = {}, _actionResolve, _markDownRegex = {
            icon: /!\(([^\)]+)\)/igm,
            image: /!\[(.*?)\]\((.*?)\)/igm,
            link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/igm
        }, _fontAwesome = 'https://cmxz.top/Bot/js/_fontAwesome.js', _esPromisePollyfill = 'https://cmxz.top/Bot/js/es6-promise.min.js', _searchselect = "https://cmxz.top/Bot/js/vue-select.js";
        o.Vue = o.Vue || g.vue;
        for (var k in _options) {
            if (g.hasOwnProperty(k)) {
                _options[k] = g[k]
            }
        }
        if (!o.Promise && typeof Promise === "undefined" && !g.promise) {
            loadScript(_esPromisePollyfill)
        }
        function _linkReplacer(a, b, c, d) {
            var e = d ? 'blank' : '';
            return "<a class='botui-message-content-link' target='" + e + "' href='" + c + "'>" + b + "</a>"
        }
        function _parseMarkDown(a) {
            return a.replace(_markDownRegex.image, "<img class='botui-message-content-image' src='$2' alt='$1' />").replace(_markDownRegex.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>").replace(_markDownRegex.link, _linkReplacer)
        }
        function loadScript(a, b) {
            var c = document.createElement('script');
            c.type = 'text/javascript';
            c.src = a;
            if (b) {
                c.onload = b
            }
            document.body.appendChild(c)
        }
        function _handleAction(a) {
            if (m.action.addMessage) {
                _interface.message.human({
                    delay: 100,
                    content: a
                })
            }
            m.action.show = !m.action.autoHide
        }
        var l = {
            template: '<div class=\"botui botui-container\" v-botui-container><div class=\"botui-messages-container\"><div v-for=\"msg in messages\" class=\"botui-message\" :class=\"msg.cssClass\" v-botui-scroll><transition name=\"slide-fade\"><div v-if=\"msg.visible\"><div v-if=\"msg.photo && !msg.loading\" :class=\"[\'profil\', {human: msg.human, \'agent\': !msg.human}]\"> <img :class=\"[{human: msg.human, \'agent\': !msg.human}]\"></div><div :class=\"[{human: msg.human, \'botui-message-content\': true}, msg.type]\"><span v-if=\"msg.type == \'text\'\" v-text=\"msg.content\" v-botui-markdown></span><span v-if=\"msg.type == \'html\'\" v-html=\"msg.content\"></span> <iframe v-if=\"msg.type == \'embed\'\" :src=\"msg.content\" frameborder=\"0\" allowfullscreen></iframe></div></div></transition><div v-if=\"msg.photo && msg.loading && !msg.human\" :class=\"[\'profil\', {human: msg.human, \'agent\': !msg.human}]\"> <img :class=\"[{human: msg.human, \'agent\': !msg.human}]\"></div><div v-if=\"msg.loading\" class=\"botui-message-content loading\"><i class=\"dot\"></i><i class=\"dot\"></i><i class=\"dot\"></i></div></div></div><div class=\"botui-actions-container\"><transition name=\"slide-fade\"><div v-if=\"action.show\" v-botui-scroll><form v-if=\"action.type == \'text\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\" action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button></form><form v-if=\"action.type == \'select\'\" class=\"botui-actions-select\" @submit.prevent=\"handle_action_select()\" :class=\"action.cssClass\"><i v-if=\"action.select.icon\" class=\"botui-icon botui-action-select-icon fa\" :class=\"\'fa-\' + action.select.icon\"></i><v-select v-if=\"action.select.searchselect && !action.select.multipleselect\" v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select><v-select v-else-if=\"action.select.searchselect && action.select.multipleselect\" multiple v-model=\"action.select.value\" :value=\"action.select.value\" :placeholder=\"action.select.placeholder\" class=\"botui-actions-text-searchselect\" :label=\"action.select.label\" :options=\"action.select.options\"></v-select> <select v-else v-model=\"action.select.value\" class=\"botui-actions-text-select\" :placeholder=\"action.select.placeholder\" :size=\"action.select.size\" :class=\"action.select.cssClass\" required v-focus><option v-for=\"option in action.select.options\" :class=\"action.select.optionClass\" v-bind:value=\"option.value\" :disabled=\"(option.value == \'\')?true:false\" :selected=\"(action.select.value == option.value)?\'selected\':\'\'\"> {{ option.text }}</option></select> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.select.button, \'botui-actions-select-submit\': !action.select.button}\"><i v-if=\"action.select.button && action.select.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.select.button.icon\"></i> <span>{{(action.select.button && action.select.button.label) || \'Ok\'}}</span></button></form><div v-if=\"action.type == \'button\'\" class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\"><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div><form v-if=\"action.type == \'buttontext\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\"action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button><div class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div></form></div></transition></div></div>',
            data: function() {
                return {
                    action: {
                        text: {
                            size: 30,
                            placeholder: 'Write here ..'
                        },
                        button: {},
                        show: false,
                        type: 'text',
                        autoHide: true,
                        addMessage: true
                    },
                    messages: []
                }
            },
            computed: {
                isMobile: function() {
                    return o.innerWidth && o.innerWidth <= 768
                }
            },
            methods: {
                handle_action_button: function(a) {
                    for (var i = 0; i < this.action.button.buttons.length; i++) {
                        if (this.action.button.buttons[i].value == a.value && typeof (this.action.button.buttons[i].event) == 'function') {
                            this.action.button.buttons[i].event(a);
                            if (this.action.button.buttons[i].actionStop)
                                return false;
                            break
                        }
                    }
                    _handleAction(a.text);
                    var b = {
                        type: 'button',
                        text: a.text,
                        value: a.value
                    };
                    for (var c in a) {
                        if (a.hasOwnProperty(c)) {
                            if (c !== 'type' && c !== 'text' && c !== 'value') {
                                b[c] = a[c]
                            }
                        }
                    }
                    _actionResolve(b)
                },
                handle_action_text: function() {
                    if (!this.action.text.value)
                        return;
                    _handleAction(this.action.text.value);
                    _actionResolve({
                        type: 'text',
                        value: this.action.text.value
                    });
                    this.action.text.value = ''
                },
                handle_action_select: function() {
                    if (this.action.select.searchselect && !this.action.select.multipleselect) {
                        if (!this.action.select.value.value)
                            return;
                        _handleAction(this.action.select.value[this.action.select.label]);
                        _actionResolve({
                            type: 'text',
                            value: this.action.select.value.value,
                            text: this.action.select.value.text,
                            obj: this.action.select.value
                        })
                    }
                    if (this.action.select.searchselect && this.action.select.multipleselect) {
                        if (!this.action.select.value)
                            return;
                        var a = new Array();
                        var b = new Array();
                        for (var i = 0; i < this.action.select.value.length; i++) {
                            a.push(this.action.select.value[i].value);
                            b.push(this.action.select.value[i][this.action.select.label])
                        }
                        _handleAction(b.join(', '));
                        _actionResolve({
                            type: 'text',
                            value: a.join(', '),
                            text: b.join(', '),
                            obj: this.action.select.value
                        })
                    } else {
                        if (!this.action.select.value)
                            return;
                        for (var i = 0; i < this.action.select.options.length; i++) {
                            if (this.action.select.options[i].value == this.action.select.value) {
                                _handleAction(this.action.select.options[i].text);
                                _actionResolve({
                                    type: 'text',
                                    value: this.action.select.value,
                                    text: this.action.select.options[i].text
                                })
                            }
                        }
                    }
                }
            }
        };
        o.Vue.directive('botui-markdown', function(a, b) {
            if (b.value == 'false')
                return;
            a.innerHTML = _parseMarkDown(a.textContent)
        });
        o.Vue.directive('botui-scroll', {
            inserted: function(a) {}
        });
        o.Vue.directive('focus', {
            inserted: function(a) {}
        });
        o.Vue.directive('botui-container', {
            inserted: function(a) {
                _container = a
            }
        });
        h = new o.Vue({
            components: {
                'bot-ui': l
            }
        }).$mount('#' + f);
        var m = h.$children[0];
        var n = document.getElementById("sound");
        function _addMessage(c) {
            if (!c.loading && !c.content) {
                throw Error('BotUI: "content" is required in a non-loading message object.');
            }
            c.type = c.type || 'text';
            c.visible = (c.delay || c.loading) ? false : true;
            var d = m.messages.push(c) - 1;
            return new Promise(function(a, b) {
                setTimeout(function() {
                    if (c.delay) {
                        c.visible = true;
                        if (c.loading) {
                            c.loading = false
                        }
                    }
                    n.play();
                    a(d)
                }, c.delay || 0)
            }
            )
        }
        function _checkOpts(a) {
            if (typeof a === 'string') {
                a = {
                    content: a
                }
            }
            return a || {}
        }
        _interface.message = {
            add: function(a) {
                return _addMessage(_checkOpts(a))
            },
            bot: function(a) {
                a = _checkOpts(a);
                return _addMessage(a)
            },
            human: function(a) {
                a = _checkOpts(a);
                a.human = true;
                return _addMessage(a)
            },
            get: function(a) {
                return Promise.resolve(m.messages[a])
            },
            remove: function(a) {
                m.messages.splice(a, 1);
                return Promise.resolve()
            },
            update: function(a, b) {
                var c = m.messages[a];
                c.content = b.content;
                c.visible = !b.loading;
                c.loading = !!b.loading;
                return Promise.resolve(b.content)
            },
            removeAll: function() {
                m.messages.splice(0, m.messages.length);
                return Promise.resolve()
            }
        };
        function mergeAtoB(a, b) {
            for (var c in a) {
                if (!b.hasOwnProperty(c)) {
                    b[c] = a[c]
                }
            }
        }
        function _checkAction(a) {
            if (!a.action && !a.actionButton && !a.actionText) {
                throw Error('BotUI: "action" property is required.');
            }
        }
        function _showActions(c) {
            _checkAction(c);
            mergeAtoB({
                type: 'text',
                cssClass: '',
                autoHide: true,
                addMessage: true
            }, c);
            m.action.type = c.type;
            m.action.cssClass = c.cssClass;
            m.action.autoHide = c.autoHide;
            m.action.addMessage = c.addMessage;
            return new Promise(function(a, b) {
                _actionResolve = a;
                setTimeout(function() {
                    m.action.show = true
                }, c.delay || 0)
            }
            )
        }
        ;_interface.action = {
            show: _showActions,
            hide: function() {
                m.action.show = false;
                return Promise.resolve()
            },
            text: function(a) {
                _checkAction(a);
                m.action.text = a.action;
                return _showActions(a)
            },
            button: function(a) {
                _checkAction(a);
                a.type = 'button';
                m.action.button.buttons = a.action;
                return _showActions(a)
            },
            select: function(a) {
                _checkAction(a);
                a.type = 'select';
                a.action.label = a.action.label || 'text';
                a.action.value = a.action.value || '';
                a.action.searchselect = typeof a.action.searchselect !== 'undefined' ? a.action.searchselect : _options.searchselect;
                a.action.multipleselect = a.action.multipleselect || false;
                if (a.action.searchselect && typeof (a.action.value) == 'string') {
                    if (!a.action.multipleselect) {
                        for (var i = 0; i < a.action.options.length; i++) {
                            if (a.action.options[i].value == a.action.value) {
                                a.action.value = a.action.options[i]
                            }
                        }
                    } else {
                        var b = a.action.value.split(',');
                        a.action.value = new Array();
                        for (var i = 0; i < a.action.options.length; i++) {
                            for (var j = 0; j < b.length; j++) {
                                if (a.action.options[i].value == b[j]) {
                                    a.action.value.push(a.action.options[i])
                                }
                            }
                        }
                    }
                }
                if (!a.action.searchselect) {
                    a.action.options.unshift({
                        value: '',
                        text: a.action.placeholder
                    })
                }
                m.action.button = a.action.button;
                m.action.select = a.action;
                return _showActions(a)
            },
            buttontext: function(a) {
                _checkAction(a);
                a.type = 'buttontext';
                m.action.button.buttons = a.actionButton;
                m.action.text = a.actionText;
                return _showActions(a)
            }
        };
        if (_options.fontawesome) {
            loadScript(_fontAwesome)
        }
        if (_options.searchselect) {
            loadScript(_searchselect, function() {
                Vue.component('v-select', VueSelect.VueSelect)
            })
        }
        if (_options.debug) {
            _interface._botApp = h
        }
        return _interface
    }
    );
    return q
}));
