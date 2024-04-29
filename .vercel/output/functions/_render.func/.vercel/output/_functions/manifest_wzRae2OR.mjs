import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_Bsppbtou.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":":root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}@font-face{font-family:GraffitiBubble;src:url(/fonts/GraffitiBubble-DemoVersion-Regular.ttf);font-style:normal}@font-face{font-family:PeterQuincy;src:url(/fonts/Peter%20Quincy%20Sans.otf);font-style:normal}html{font-family:system-ui,sans-serif;background-color:#fff;background-size:224px}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}\n.head[data-astro-cid-ceww36si]{text-align:center;padding:5px}a[data-astro-cid-ceww36si]{color:#ff00d4;text-decoration:none}hr[data-astro-cid-ceww36si]{border-color:#ff00d4}header[data-astro-cid-ceww36si]{font-family:GraffitiBubble;font-size:150px}\n"}],"routeData":{"route":"/bits","isIndex":false,"type":"page","pattern":"^\\/bits\\/?$","segments":[[{"content":"bits","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bits.astro","pathname":"/bits","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"async function p(n,t,o){const{callbackUrl:r=window.location.href,redirect:e=!0}={},{prefix:a=\"/api/auth\",...i}={},w=n===\"email\",d=`${`${a}/signin/${n}`}?${new URLSearchParams(o)}`,u=await fetch(`${a}/csrf`),{csrfToken:f}=await u.json(),l=await fetch(d,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({...i,csrfToken:f,callbackUrl:r})}),s=await l.clone().json(),h=new URL(s.url).searchParams.get(\"error\");if(e||!w||!h){window.location.href=s.url??r,s.url.includes(\"#\")&&window.location.reload();return}return l}async function m(n){const{callbackUrl:t=window.location.href,prefix:o=\"/api/auth\"}={},r=await fetch(`${o}/csrf`),{csrfToken:e}=await r.json(),c=(await(await fetch(`${o}/signout`,{method:\"post\",headers:{\"Content-Type\":\"application/x-www-form-urlencoded\",\"X-Auth-Return-Redirect\":\"1\"},body:new URLSearchParams({csrfToken:e,callbackUrl:t})})).json()).url??t;window.location.href=c,c.includes(\"#\")&&window.location.reload()}document.getElementById(\"logout\").onclick=async()=>{try{await m()}catch(n){console.error(\"Error al cerrar sesión:\",n)}};document.getElementById(\"login\").onclick=async()=>{try{await p(\"discord\")}catch(n){console.error(\"Error al iniciar sesión:\",n)}};\n"}],"styles":[{"type":"inline","content":".shop[data-astro-cid-fy4mosms]{text-align:center;color:#fff;font-family:PeterQuincy;font-size:35px}.intro[data-astro-cid-jtpc5rm5]{text-align:center;padding:5px;margin:10px}.introtxt[data-astro-cid-jtpc5rm5]{text-align:center;font-family:PeterQuincy;color:#fff;font-size:35px;margin:5px}.head[data-astro-cid-j7pv25f6]{text-align:center;padding:5px;font-size:150px;font-family:GraffitiBubble;background-color:#ff00d4}a[data-astro-cid-j7pv25f6]{color:#000;text-decoration:none}hr[data-astro-cid-j7pv25f6]{border-color:#ff00d4}header[data-astro-cid-j7pv25f6]{font-family:GraffitiBubble;background-color:#ff00d4}#logout[data-astro-cid-j7pv25f6]{align-items:right: inherit}.log[data-astro-cid-j7pv25f6]{text-align:center;margin:50px 800px;background-color:#515151;border-radius:7px;padding:17px;border:3px solid rgb(255,0,212)}.label[data-astro-cid-j7pv25f6]{background-color:#111;display:flex;border-radius:50px;height:26px;width:50px;align-items:center;justify-content:space-between;padding:6px;position:relative}.fa-moon[data-astro-cid-j7pv25f6]{color:#f1c40f}.fa-sun[data-astro-cid-j7pv25f6]{color:#f39c12}.ball[data-astro-cid-j7pv25f6]{background-color:#fff;border-radius:50%;position:absolute;width:26px;height:26px;transition:transform .2s linear}.checkbox[data-astro-cid-j7pv25f6]{opacity:0;position:absolute}.checkbox[data-astro-cid-j7pv25f6]:checked+.label[data-astro-cid-j7pv25f6] .ball[data-astro-cid-j7pv25f6]{transform:translate(24px)}\n:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% )}@font-face{font-family:GraffitiBubble;src:url(/fonts/GraffitiBubble-DemoVersion-Regular.ttf);font-style:normal}@font-face{font-family:PeterQuincy;src:url(/fonts/Peter%20Quincy%20Sans.otf);font-style:normal}html{font-family:system-ui,sans-serif;background-color:#fff;background-size:224px}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ivan1/svg-shop/src/pages/bits.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivan1/svg-shop/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_6kcDHee0.mjs","/src/pages/index.astro":"chunks/pages/index_D79hNvL7.mjs","\u0000@astrojs-manifest":"manifest_wzRae2OR.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DAGT08fb.mjs","\u0000@astro-page:node_modules/auth-astro/src/api/[...auth]@_@ts":"chunks/_.._BZJQt4s8.mjs","\u0000@astro-page:src/pages/bits@_@astro":"chunks/bits_CIj70dMI.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DkPns1a6.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DpLyZ75e.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/fonts/GraffitiBubble-DemoVersion-Regular.otf","/fonts/GraffitiBubble-DemoVersion-Regular.ttf","/fonts/Peter Quincy Sans.otf","/fonts/Peter Quincy.otf"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
