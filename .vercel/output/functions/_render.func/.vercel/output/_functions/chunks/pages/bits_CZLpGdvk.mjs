import { c as createAstro, d as createComponent, r as renderTemplate, e as renderHead, f as addAttribute, g as renderComponent, m as maybeRenderHead } from '../astro_Bsppbtou.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="ES/EN"> <head><meta charset="ISO-8859-1/UTF-8/ISO-8859-5"><meta name="description" content="IvanDev"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", '</head>  <script src="https://kit.fontawesome.com/8f2e26be6e.js" crossorigin="anonymous"><\/script></html>'])), addAttribute(Astro2.generator, "content"), title, renderHead());
}, "C:/Users/ivan1/svg-shop/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Bits = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Bits;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-ceww36si": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-ceww36si> <div class="head" data-astro-cid-ceww36si> <a href="/" data-astro-cid-ceww36si>SVG SHOP</a> </div> <hr data-astro-cid-ceww36si> <nav data-astro-cid-ceww36si></nav> </header> <main data-astro-cid-ceww36si></main> ` })} `;
}, "C:/Users/ivan1/svg-shop/src/pages/bits.astro", void 0);

const $$file = "C:/Users/ivan1/svg-shop/src/pages/bits.astro";
const $$url = "/bits";

const bits = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Bits,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, bits as b };
