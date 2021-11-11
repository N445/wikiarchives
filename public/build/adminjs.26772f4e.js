(self.webpackChunk=self.webpackChunk||[]).push([[582],{4819:(e,n,t)=>{"use strict";t(9826);var r=t(5829),i=t.n(r),a=t(9755);a.each(a(".git-diff"),(function(e,n){var t=(n=a(n)).find(".current").html(),r=n.find(".final").html(),o=i()(t,r);n.find(".final").html(o)}))},5829:(e,n,t)=>{var r,i,a,o,f,s,_,u,c,h,l,d,p,b,v,g,w,k;t(2772),t(3710),t(1539),t(9714),t(7042),t(9600),t(4916),t(5306),h=function(e){return">"===e},l=function(e){return"<"===e},p=function(e){return/^\s+$/.test(e)},d=function(e){return/^\s*<[^>]+>\s*$/.test(e)},b=function(e){return!d(e)},i=function(e,n,t){this.start_in_before=e,this.start_in_after=n,this.length=t,this.end_in_before=this.start_in_before+this.length-1,this.end_in_after=this.start_in_after+this.length-1},c=function(e){var n,t,r,i,a,o;for(a="char",t="",o=[],r=0,i=e.length;r<i;r++)switch(n=e[r],a){case"tag":h(n)?(t+=">",o.push(t),t="",a=p(n)?"whitespace":"char"):t+=n;break;case"char":l(n)?(t&&o.push(t),t="<",a="tag"):/\s/.test(n)?(t&&o.push(t),t=n,a="whitespace"):/[\w\#@]+/i.test(n)?t+=n:(t&&o.push(t),t=n);break;case"whitespace":l(n)?(t&&o.push(t),t="<",a="tag"):p(n)?t+=n:(t&&o.push(t),t=n,a="char");break;default:throw new Error("Unknown mode "+a)}return t&&o.push(t),o},_=function(e,n,t,r,a,o,f){var s,_,u,c,h,l,d,p,b,v,g,w,k,m,y;for(_=r,s=o,u=0,g={},l=c=m=r,y=a;m<=y?c<y:c>y;l=m<=y?++c:--c){for(k={},d=0,p=(b=t[e[l]]).length;d<p;d++)if(!((h=b[d])<o)){if(h>=f)break;null==g[h-1]&&(g[h-1]=0),w=g[h-1]+1,k[h]=w,w>u&&(_=l-w+1,s=h-w+1,u=w)}g=k}return 0!==u&&(v=new i(_,s,u)),v},g=function(e,n,t,r,i,a,o,f){var s;return null!=(s=_(e,0,t,r,i,a,o))&&(r<s.start_in_before&&a<s.start_in_after&&g(e,n,t,r,s.start_in_before,a,s.start_in_after,f),f.push(s),s.end_in_before<=i&&s.end_in_after<=o&&g(e,n,t,s.end_in_before+1,i,s.end_in_after+1,o,f)),f},f=function(e){var n,t,r,i,a,o;if(null==e.find_these)throw new Error("params must have find_these key");if(null==e.in_these)throw new Error("params must have in_these key");for(r={},n=0,i=(a=e.find_these).length;n<i;n++)for(r[o=a[n]]=[],t=e.in_these.indexOf(o);-1!==t;)r[o].push(t),t=e.in_these.indexOf(o,t+1);return r},u=function(e,n){var t,r;return r=[],t=f({find_these:e,in_these:n}),g(e,n,t,0,e.length,0,n.length,r)},a=function(e,n){var t,r,a,o,f,s,_,c,h,l,d,p,b,v,g,w;if(null==e)throw new Error("before_tokens?");if(null==n)throw new Error("after_tokens?");for(g=v=0,b=[],t={"false,false":"replace","true,false":"insert","false,true":"delete","true,true":"none"},(d=u(e,n)).push(new i(e.length,n.length,0)),o=a=0,c=d.length;a<c;o=++a)"none"!==(r=t[[g===(l=d[o]).start_in_before,v===l.start_in_after].toString()])&&b.push({action:r,start_in_before:g,end_in_before:"insert"!==r?l.start_in_before-1:void 0,start_in_after:v,end_in_after:"delete"!==r?l.start_in_after-1:void 0}),0!==l.length&&b.push({action:"equal",start_in_before:l.start_in_before,end_in_before:l.end_in_before,start_in_after:l.start_in_after,end_in_after:l.end_in_after}),g=l.end_in_before+1,v=l.end_in_after+1;for(w=[],_={action:"none"},f=function(n){return"equal"===n.action&&n.end_in_before-n.start_in_before==0&&/^\s$/.test(e.slice(n.start_in_before,+n.end_in_before+1||9e9))},s=0,h=b.length;s<h;s++)f(p=b[s])&&"replace"===_.action||"replace"===p.action&&"replace"===_.action?(_.end_in_before=p.end_in_before,_.end_in_after=p.end_in_after):(w.push(p),_=p);return w},o=function(e,n,t){var r,i,a,o,f;for(o=void 0,a=i=0,f=(n=n.slice(e,+n.length+1||9e9)).length;i<f&&(!0===(r=t(n[a]))&&(o=a),!1!==r);a=++i);return null!=o?n.slice(0,+o+1||9e9):[]},k=function(e,n){var t,r,i,a,f;for(a="",i=0,t=n.length;!(i>=t||(i+=(r=o(i,n,b)).length,0!==r.length&&(a+="<"+e+">"+r.join("")+"</"+e+">"),i>=t));)i+=(f=o(i,n,d)).length,a+=f.join("");return a},(v={equal:function(e,n,t){return n.slice(e.start_in_before,+e.end_in_before+1||9e9).join("")},insert:function(e,n,t){var r;return r=t.slice(e.start_in_after,+e.end_in_after+1||9e9),k("ins",r)},delete:function(e,n,t){var r;return r=n.slice(e.start_in_before,+e.end_in_before+1||9e9),k("del",r)}}).replace=function(e,n,t){return v.delete(e,n,t)+v.insert(e,n,t)},w=function(e,n,t){var r,i,a,o;for(o="",r=0,i=t.length;r<i;r++)a=t[r],o+=v[a.action](a,e,n);return o},(s=function(e,n){var t;return e===n?e:(e=c(e),n=c(n),t=a(e,n),w(e,n,t))}).html_to_tokens=c,s.find_matching_blocks=u,u.find_match=_,u.create_index=f,s.calculate_operations=a,s.render_operations=w,void 0===(r=function(){return s}.apply(n,[]))||(e.exports=r)},1194:(e,n,t)=>{var r=t(7293),i=t(5112),a=t(7392),o=i("species");e.exports=function(e){return a>=51||!r((function(){var n=[];return(n.constructor={})[o]=function(){return{foo:1}},1!==n[e](Boolean).foo}))}},6135:(e,n,t)=>{"use strict";var r=t(4948),i=t(3070),a=t(9114);e.exports=function(e,n,t){var o=r(n);o in e?i.f(e,o,a(0,t)):e[o]=t}},7042:(e,n,t)=>{"use strict";var r=t(2109),i=t(3157),a=t(4411),o=t(111),f=t(1400),s=t(6244),_=t(5656),u=t(6135),c=t(5112),h=t(1194)("slice"),l=c("species"),d=[].slice,p=Math.max;r({target:"Array",proto:!0,forced:!h},{slice:function(e,n){var t,r,c,h=_(this),b=s(h),v=f(e,b),g=f(void 0===n?b:n,b);if(i(h)&&(t=h.constructor,(a(t)&&(t===Array||i(t.prototype))||o(t)&&null===(t=t[l]))&&(t=void 0),t===Array||void 0===t))return d.call(h,v,g);for(r=new(void 0===t?Array:t)(p(g-v,0)),c=0;v<g;v++,c++)v in h&&u(r,c,h[v]);return r.length=c,r}})}},e=>{e.O(0,[755,773,446],(()=>{return n=4819,e(e.s=n);var n}));e.O()}]);