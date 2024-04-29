import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_Bsppbtou.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as getSession } from './__jGxtK1tE.mjs';
import 'clsx';
/* empty css                          */
import { $ as $$Layout } from './bits_CZLpGdvk.mjs';

const $$Astro$2 = createAstro();
const $$Shop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Shop;
  const session = await getSession(Astro2.request);
  return renderTemplate`${maybeRenderHead()}<section class="shop" data-astro-cid-fy4mosms> <p data-astro-cid-fy4mosms>Hola, ${session && session.user ? session.user.name : "Usuario"}!</p> <button id="logout" data-astro-cid-fy4mosms>Cerrar sesion</button> </section>  `;
}, "C:/Users/ivan1/svg-shop/src/components/register/Shop.astro", void 0);

const $$Astro$1 = createAstro();
const $$Intro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Intro;
  return renderTemplate`${maybeRenderHead()}<section class="intro" data-astro-cid-jtpc5rm5> <div class="introtxt" data-astro-cid-jtpc5rm5>DESCUBRE LA MEJOR TIENDA </div> <button id="login" data-astro-cid-jtpc5rm5>Iniciar sesion</button> </section>  `;
}, "C:/Users/ivan1/svg-shop/src/components/register/Intro.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bienvenido a SVG SHOP", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <input type="checkbox" class="checkbox" id="checkbox" data-astro-cid-j7pv25f6> <label for="checkbox" class="label" data-astro-cid-j7pv25f6> <i class="fas fa-moon" data-astro-cid-j7pv25f6></i> <i class="fas fa-sun" data-astro-cid-j7pv25f6></i> <div class="ball" data-astro-cid-j7pv25f6></div> </label> </div> <div class="head" data-astro-cid-j7pv25f6> <a href="/" data-astro-cid-j7pv25f6>SVG SHOP</a> </div> </header> <hr data-astro-cid-j7pv25f6> <main data-astro-cid-j7pv25f6> ${session == null ? renderTemplate`${renderComponent($$result2, "Intro", $$Intro, { "data-astro-cid-j7pv25f6": true })}` : renderTemplate`${renderComponent($$result2, "Shop", $$Shop, { "data-astro-cid-j7pv25f6": true })}`} </main> ` })} `;
}, "C:/Users/ivan1/svg-shop/src/pages/index.astro", void 0);

const $$file = "C:/Users/ivan1/svg-shop/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
