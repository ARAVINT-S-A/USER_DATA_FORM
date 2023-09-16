const $e = (e, n) => e === n, W = {
  equals: $e
};
let Se = ge;
const F = 1, V = 2, fe = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var h = null;
let ne = null, d = null, g = null, q = null, Y = 0;
function _e(e, n) {
  const t = d, r = h, l = e.length === 0, i = l ? fe : {
    owned: null,
    cleanups: null,
    context: null,
    owner: n === void 0 ? r : n
  }, o = l ? e : () => e(() => A(() => ee(i)));
  h = i, d = null;
  try {
    return N(o, !0);
  } finally {
    d = t, h = r;
  }
}
function _(e, n) {
  n = n ? Object.assign({}, W, n) : W;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, r = (l) => (typeof l == "function" && (l = l(t.value)), pe(t, l));
  return [me.bind(t), r];
}
function C(e, n, t) {
  const r = be(e, n, !1, F);
  Z(r);
}
function w(e, n, t) {
  t = t ? Object.assign({}, W, t) : W;
  const r = be(e, n, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, Z(r), me.bind(r);
}
function A(e) {
  if (d === null)
    return e();
  const n = d;
  d = null;
  try {
    return e();
  } finally {
    d = n;
  }
}
function Ce(e, n, t) {
  const r = Array.isArray(e);
  let l, i = t && t.defer;
  return (o) => {
    let s;
    if (r) {
      s = Array(e.length);
      for (let u = 0; u < e.length; u++)
        s[u] = e[u]();
    } else
      s = e();
    if (i) {
      i = !1;
      return;
    }
    const a = A(() => n(s, l, o));
    return l = s, a;
  };
}
function de(e) {
  return h === null || (h.cleanups === null ? h.cleanups = [e] : h.cleanups.push(e)), e;
}
function Ee() {
  return h;
}
function Ae(e, n) {
  const t = h, r = d;
  h = e, d = null;
  try {
    return N(n, !0);
  } catch (l) {
    oe(l);
  } finally {
    h = t, d = r;
  }
}
function je(e) {
  const n = d, t = h;
  return Promise.resolve().then(() => {
    d = n, h = t;
    let r;
    return N(e, !1), d = h = null, r ? r.done : void 0;
  });
}
function he(e, n) {
  const t = Symbol("context");
  return {
    id: t,
    Provider: Re(t),
    defaultValue: e
  };
}
function Pe(e) {
  let n;
  return (n = ve(h, e.id)) !== void 0 ? n : e.defaultValue;
}
function ke(e) {
  const n = w(e), t = w(() => se(n()));
  return t.toArray = () => {
    const r = t();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, t;
}
function me() {
  if (this.sources && this.state)
    if (this.state === F)
      Z(this);
    else {
      const e = g;
      g = null, N(() => J(this), !1), g = e;
    }
  if (d) {
    const e = this.observers ? this.observers.length : 0;
    d.sources ? (d.sources.push(this), d.sourceSlots.push(e)) : (d.sources = [this], d.sourceSlots = [e]), this.observers ? (this.observers.push(d), this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d], this.observerSlots = [d.sources.length - 1]);
  }
  return this.value;
}
function pe(e, n, t) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && N(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const i = e.observers[l], o = ne && ne.running;
      o && ne.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? g.push(i) : q.push(i), i.observers && we(i)), o || (i.state = F);
    }
    if (g.length > 1e6)
      throw g = [], new Error();
  }, !1)), n;
}
function Z(e) {
  if (!e.fn)
    return;
  ee(e);
  const n = h, t = d, r = Y;
  d = h = e, Le(e, e.value, r), d = t, h = n;
}
function Le(e, n, t) {
  let r;
  try {
    r = e.fn(n);
  } catch (l) {
    return e.pure && (e.state = F, e.owned && e.owned.forEach(ee), e.owned = null), e.updatedAt = t + 1, oe(l);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? pe(e, r) : e.value = r, e.updatedAt = t);
}
function be(e, n, t, r = F, l) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: h,
    context: null,
    pure: t
  };
  return h === null || h !== fe && (h.owned ? h.owned.push(i) : h.owned = [i]), i;
}
function ye(e) {
  if (e.state === 0)
    return;
  if (e.state === V)
    return J(e);
  if (e.suspense && A(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Y); )
    e.state && n.push(e);
  for (let t = n.length - 1; t >= 0; t--)
    if (e = n[t], e.state === F)
      Z(e);
    else if (e.state === V) {
      const r = g;
      g = null, N(() => J(e, n[0]), !1), g = r;
    }
}
function N(e, n) {
  if (g)
    return e();
  let t = !1;
  n || (g = []), q ? t = !0 : q = [], Y++;
  try {
    const r = e();
    return Te(t), r;
  } catch (r) {
    t || (q = null), g = null, oe(r);
  }
}
function Te(e) {
  if (g && (ge(g), g = null), e)
    return;
  const n = q;
  q = null, n.length && N(() => Se(n), !1);
}
function ge(e) {
  for (let n = 0; n < e.length; n++)
    ye(e[n]);
}
function J(e, n) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const r = e.sources[t];
    if (r.sources) {
      const l = r.state;
      l === F ? r !== n && (!r.updatedAt || r.updatedAt < Y) && ye(r) : l === V && J(r, n);
    }
  }
}
function we(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const t = e.observers[n];
    t.state || (t.state = V, t.pure ? g.push(t) : q.push(t), t.observers && we(t));
  }
}
function ee(e) {
  let n;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), r = e.sourceSlots.pop(), l = t.observers;
      if (l && l.length) {
        const i = l.pop(), o = t.observerSlots.pop();
        r < l.length && (i.sourceSlots[o] = r, l[r] = i, t.observerSlots[r] = o);
      }
    }
  if (e.owned) {
    for (n = e.owned.length - 1; n >= 0; n--)
      ee(e.owned[n]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (n = e.cleanups.length - 1; n >= 0; n--)
      e.cleanups[n]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function oe(e) {
  throw e;
}
function ve(e, n) {
  return e ? e.context && e.context[n] !== void 0 ? e.context[n] : ve(e.owner, n) : void 0;
}
function se(e) {
  if (typeof e == "function" && !e.length)
    return se(e());
  if (Array.isArray(e)) {
    const n = [];
    for (let t = 0; t < e.length; t++) {
      const r = se(e[t]);
      Array.isArray(r) ? n.push.apply(n, r) : n.push(r);
    }
    return n;
  }
  return e;
}
function Re(e, n) {
  return function(r) {
    let l;
    return C(() => l = A(() => (h.context = {
      [e]: r.value
    }, ke(() => r.children))), void 0), l;
  };
}
function y(e, n) {
  return A(() => e(n || {}));
}
const Oe = (e) => `Stale read from <${e}>.`;
function L(e) {
  const n = e.keyed, t = w(() => e.when, void 0, {
    equals: (r, l) => n ? r === l : !r == !l
  });
  return w(() => {
    const r = t();
    if (r) {
      const l = e.children;
      return typeof l == "function" && l.length > 0 ? A(() => l(n ? r : () => {
        if (!A(t))
          throw Oe("Show");
        return e.when;
      })) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function qe(e, n, t) {
  let r = t.length, l = n.length, i = r, o = 0, s = 0, a = n[l - 1].nextSibling, u = null;
  for (; o < l || s < i; ) {
    if (n[o] === t[s]) {
      o++, s++;
      continue;
    }
    for (; n[l - 1] === t[i - 1]; )
      l--, i--;
    if (l === o) {
      const c = i < r ? s ? t[s - 1].nextSibling : t[i - s] : a;
      for (; s < i; )
        e.insertBefore(t[s++], c);
    } else if (i === s)
      for (; o < l; )
        (!u || !u.has(n[o])) && n[o].remove(), o++;
    else if (n[o] === t[i - 1] && t[s] === n[l - 1]) {
      const c = n[--l].nextSibling;
      e.insertBefore(t[s++], n[o++].nextSibling), e.insertBefore(t[--i], c), n[l] = t[i];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let p = s;
        for (; p < i; )
          u.set(t[p], p++);
      }
      const c = u.get(n[o]);
      if (c != null)
        if (s < c && c < i) {
          let p = o, v = 1, x;
          for (; ++p < l && p < i && !((x = u.get(n[p])) == null || x !== c + v); )
            v++;
          if (v > c - s) {
            const $ = n[o];
            for (; s < c; )
              e.insertBefore(t[s++], $);
          } else
            e.replaceChild(t[s++], n[o++]);
        } else
          o++;
      else
        n[o++].remove();
    }
  }
}
const ae = "_$DX_DELEGATE";
function Fe(e, n, t, r = {}) {
  let l;
  return _e((i) => {
    l = i, n === document ? e() : E(n, e(), n.firstChild ? null : void 0, t);
  }, r.owner), () => {
    l(), n.textContent = "";
  };
}
function T(e, n, t) {
  let r;
  const l = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, t ? o.content.firstChild.firstChild : o.content.firstChild;
  }, i = n ? () => A(() => document.importNode(r || (r = l()), !0)) : () => (r || (r = l())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function Ne(e, n = window.document) {
  const t = n[ae] || (n[ae] = /* @__PURE__ */ new Set());
  for (let r = 0, l = e.length; r < l; r++) {
    const i = e[r];
    t.has(i) || (t.add(i), n.addEventListener(i, Be));
  }
}
function De(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function E(e, n, t, r) {
  if (t !== void 0 && !r && (r = []), typeof n != "function")
    return X(e, n, r, t);
  C((l) => X(e, n(), l, t), r);
}
function Be(e) {
  const n = `$$${e.type}`;
  let t = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== t && Object.defineProperty(e, "target", {
    configurable: !0,
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }); t; ) {
    const r = t[n];
    if (r && !t.disabled) {
      const l = t[`${n}Data`];
      if (l !== void 0 ? r.call(t, l, e) : r.call(t, e), e.cancelBubble)
        return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function X(e, n, t, r, l) {
  for (; typeof t == "function"; )
    t = t();
  if (n === t)
    return t;
  const i = typeof n, o = r !== void 0;
  if (e = o && t[0] && t[0].parentNode || e, i === "string" || i === "number")
    if (i === "number" && (n = n.toString()), o) {
      let s = t[0];
      s && s.nodeType === 3 ? s.data = n : s = document.createTextNode(n), t = M(e, t, r, s);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  else if (n == null || i === "boolean")
    t = M(e, t, r);
  else {
    if (i === "function")
      return C(() => {
        let s = n();
        for (; typeof s == "function"; )
          s = s();
        t = X(e, s, t, r);
      }), () => t;
    if (Array.isArray(n)) {
      const s = [], a = t && Array.isArray(t);
      if (ie(s, n, t, l))
        return C(() => t = X(e, s, t, r, !0)), () => t;
      if (s.length === 0) {
        if (t = M(e, t, r), o)
          return t;
      } else
        a ? t.length === 0 ? ue(e, s, r) : qe(e, t, s) : (t && M(e), ue(e, s));
      t = s;
    } else if (n.nodeType) {
      if (Array.isArray(t)) {
        if (o)
          return t = M(e, t, r, n);
        M(e, t, null, n);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(n) : e.replaceChild(n, e.firstChild);
      t = n;
    } else
      console.warn("Unrecognized value. Skipped inserting", n);
  }
  return t;
}
function ie(e, n, t, r) {
  let l = !1;
  for (let i = 0, o = n.length; i < o; i++) {
    let s = n[i], a = t && t[i], u;
    if (!(s == null || s === !0 || s === !1))
      if ((u = typeof s) == "object" && s.nodeType)
        e.push(s);
      else if (Array.isArray(s))
        l = ie(e, s, a) || l;
      else if (u === "function")
        if (r) {
          for (; typeof s == "function"; )
            s = s();
          l = ie(e, Array.isArray(s) ? s : [s], Array.isArray(a) ? a : [a]) || l;
        } else
          e.push(s), l = !0;
      else {
        const c = String(s);
        a && a.nodeType === 3 && a.data === c ? e.push(a) : e.push(document.createTextNode(c));
      }
  }
  return l;
}
function ue(e, n, t = null) {
  for (let r = 0, l = n.length; r < l; r++)
    e.insertBefore(n[r], t);
}
function M(e, n, t, r) {
  if (t === void 0)
    return e.textContent = "";
  const l = r || document.createTextNode("");
  if (n.length) {
    let i = !1;
    for (let o = n.length - 1; o >= 0; o--) {
      const s = n[o];
      if (l !== s) {
        const a = s.parentNode === e;
        !i && !o ? a ? e.replaceChild(l, s) : e.insertBefore(l, t) : a && s.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(l, t);
  return [l];
}
const Ge = !1;
const Ie = /* @__PURE__ */ T('<div><div class="flex justify-evenly"><div class="flex justify-center align-middle items-center h-screen"><span class="text-white items-center">Thank you </span></div><form id="form10" class="flex justify-center h-screen items-center"><button type="submit" form="form10" class="bg-yellow-400 flex justify-center items-center rounded-md">go back');
function Me() {
  return (() => {
    const e = Ie(), n = e.firstChild, t = n.firstChild, r = t.firstChild;
    return r.firstChild, E(r, () => document.getElementById("name").value, null), e;
  })();
}
const Ue = /* @__PURE__ */ T('<div><div class="flex justify-center items-center h-screen"><div class="grid grid-cols-2 text-white bg-black wx-auto h-auto p-2 m-2"><div class="flex justify-center content-center">Name</div><div class="flex justify-center content-center">Email'), ze = /* @__PURE__ */ T('<div><div class="flex justify-center content-center"></div><div class="flex justify-center content-center">');
function Ke() {
  return (() => {
    const e = Ue(), n = e.firstChild, t = n.firstChild;
    return t.firstChild.nextSibling, E(t, () => model.querydata.map((l) => (() => {
      const i = ze(), o = i.firstChild, s = o.nextSibling;
      return E(o, () => l.name), E(s, () => l.Email), C(() => De(i, "key", l.id)), i;
    })()), null), e;
  })();
}
const Qe = /* @__PURE__ */ T('<div><div class="flex justify-center items-center h-screen w-screen"><form id="form4"><input class="rounded-md m-2" name="name" type="text" placeholder="enter you name to fetch form"><button type="submit" form="form4" class="bg-yellow-400 w-12 h-8 rounded-md">submit');
function He() {
  const [e, n] = _(!1), t = () => {
    n(!0), Event.preventDefault();
  };
  return [y(L, {
    get when() {
      return !e();
    },
    get children() {
      const r = Qe();
      return r.firstChild.firstChild.addEventListener("submit", t), r;
    }
  }), y(L, {
    get when() {
      return e();
    },
    get children() {
      return y(Ke, {});
    }
  })];
}
const We = /* @__PURE__ */ T('<div class="bg-black w-screen h-screen"><div class="flex justify-center"><h1 class="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">Post your Query</h1></div><main class="flex justify-center"><div class="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md"><div><div class="bg-white rounded-md w-full p-2"><form><label for="name">Name:</label><input class="border-black border-spacing-2 shadow-lg shadow-black" type="text" name="name" placeholder="enter name" size="30"><br><input class="hidden" type="text" name="id"><label for="email">Email:</label><input class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" name="Email" placeholder="abcxyz@gmail.com" size="30" required><br><label for="Gender">Gender:</label><input type="radio" name="Gender" value="Male"><label for="Male">Male</label><input type="radio" name="Gender" value="Female"><label for="Female">Female</label><input type="radio" name="Gender" value="Other"><label for="Other">Other</label><br><label for="query">Query</label><textarea class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" name="contents" placeholder="enter query under 50 words" rows="5" cols="40"></textarea><br><input type="checkbox" name="tnc" required><div class="flex justify-evenly"><button type="submit" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Submit</button><button type="reset" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Reset');
function Ve(e) {
  return (() => {
    const n = We(), t = n.firstChild, r = t.nextSibling, l = r.firstChild, i = l.firstChild, o = i.firstChild, s = o.firstChild, a = s.firstChild, u = a.nextSibling, c = u.nextSibling, p = c.nextSibling, v = p.nextSibling, x = v.nextSibling, $ = x.nextSibling, R = $.nextSibling, D = R.nextSibling, O = D.nextSibling, B = O.nextSibling, G = B.nextSibling, j = G.nextSibling, S = j.nextSibling, I = S.nextSibling, K = I.nextSibling, te = K.nextSibling;
    return C(() => u.value = e.name), C(() => p.value = e.id), C(() => x.value = e.Email), C(() => te.value = e.contents), n;
  })();
}
const Je = /* @__PURE__ */ T('<div><div class="flex justify-center"><h1 class="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">Post your Query</h1></div><main class="flex justify-center"><div class="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md"><div><div class="bg-white rounded-md w-full p-2"><form id="form1" method="post"><div><label for="name">Name:</label><input class="border-black border-spacing-2 shadow-lg shadow-black" type="text" name="name" placeholder="enter name" size="30" required id="name"></div><div><label for="email">Email:</label><input class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" name="Email" placeholder="abcxyz@gmail.com" size="30" required></div><div><label for="Gender">Gender:</label><input type="radio" name="Gender" value="Male"><label for="Male">Male</label><input type="radio" name="Gender" value="Female"><label for="Female">Female</label><input type="radio" name="Gender" value="Other"><label for="Other">Other</label></div><label for="query">Query</label><textarea class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" query="contents" name="contents" placeholder="enter query under 50 words" rows="5" cols="40"></textarea><div><input class="text-black" id="tnc" type="checkbox" name="tnc" required><label for="tnc">agree to terms and conditions</label></div><div class="flex justify-evenly"><button type="submit" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Submit</button><button type="reset" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Reset</button></div></form></div></div></div></main><footer class="flex justify-center"><div class="flex justify-evenly"><form id="f2" class="flex justify-center"><div class="flex justify-evenly"><button type="submit" form="f2" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">view submitted form</button></div></form><form id="f3" class="flex justify-center"><div class="flex justify-right"><button type="submit" form="f3" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">Edit/delete forms'), Xe = /* @__PURE__ */ T("<div>");
function Ye(e) {
  const [n, t] = _(!1), [r, l] = _(!1), [i, o] = _(!1), s = (p) => {
    t(!0), c(p), Event.preventDefault();
  }, a = () => {
    l(!0), Event.preventDefault();
  }, u = () => {
    o(!0), Event.preventDefault();
  };
  async function c(p) {
    const v = new FormData(p.target), x = Object.fromEntries(v.entries()), $ = JSON.stringify(x);
    fetch("http://localhost:8080/storedb", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: $
    });
  }
  return (() => {
    const p = Xe();
    return E(p, y(L, {
      get when() {
        return w(() => !n() && !r())() && !i();
      },
      get children() {
        const v = Je(), x = v.firstChild, $ = x.nextSibling, R = $.firstChild, D = R.firstChild, O = D.firstChild, B = O.firstChild, G = $.nextSibling, j = G.firstChild, S = j.firstChild, I = S.nextSibling;
        return B.addEventListener("submit", s), S.addEventListener("submit", a), I.addEventListener("submit", u), v;
      }
    }), null), E(p, y(L, {
      get when() {
        return n();
      },
      get children() {
        return y(Me, {});
      }
    }), null), E(p, y(L, {
      get when() {
        return w(() => !!r())() && !n();
      },
      get children() {
        return y(He, {});
      }
    }), null), E(p, y(L, {
      get when() {
        return w(() => !!i())() && !n();
      },
      get children() {
        return y(Ve, {
          name: 1,
          email: 2,
          contents: 3
        });
      }
    }), null), p;
  })();
}
const Ze = /* @__PURE__ */ T('<div class="bg-gray-800 w-screen h-screen">');
function et() {
  const [e, n] = _(!1), [t, r] = _(!1);
  return (() => {
    const l = Ze();
    return E(l, y(L, {
      get when() {
        return !t();
      },
      get children() {
        return y(L, {
          get when() {
            return !e();
          },
          get children() {
            return y(Ye, {});
          }
        });
      }
    })), l;
  })();
}
function tt(e, n, t) {
  return e.addEventListener(n, t), () => e.removeEventListener(n, t);
}
function nt([e, n], t, r) {
  return [t ? () => t(e()) : e, r ? (l) => n(r(l)) : n];
}
function rt(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function lt(e, n) {
  const t = rt(`#${e}`);
  t ? t.scrollIntoView() : n && window.scrollTo(0, 0);
}
function st(e, n, t, r) {
  let l = !1;
  const i = (s) => typeof s == "string" ? { value: s } : s, o = nt(_(i(e()), { equals: (s, a) => s.value === a.value }), void 0, (s) => (!l && n(s), s));
  return t && de(t((s = e()) => {
    l = !0, o[1](i(s)), l = !1;
  })), {
    signal: o,
    utils: r
  };
}
function it(e) {
  if (e) {
    if (Array.isArray(e))
      return {
        signal: e
      };
  } else
    return {
      signal: _({ value: "" })
    };
  return e;
}
function ot() {
  return st(() => ({
    value: window.location.pathname + window.location.search + window.location.hash,
    state: history.state
  }), ({ value: e, replace: n, scroll: t, state: r }) => {
    n ? window.history.replaceState(r, "", e) : window.history.pushState(r, "", e), lt(window.location.hash.slice(1), t);
  }, (e) => tt(window, "popstate", () => e()), {
    go: (e) => window.history.go(e)
  });
}
function at() {
  let e = /* @__PURE__ */ new Set();
  function n(l) {
    return e.add(l), () => e.delete(l);
  }
  let t = !1;
  function r(l, i) {
    if (t)
      return !(t = !1);
    const o = {
      to: l,
      options: i,
      defaultPrevented: !1,
      preventDefault: () => o.defaultPrevented = !0
    };
    for (const s of e)
      s.listener({
        ...o,
        from: s.location,
        retry: (a) => {
          a && (t = !0), s.navigate(l, i);
        }
      });
    return !o.defaultPrevented;
  }
  return {
    subscribe: n,
    confirm: r
  };
}
const ut = /^(?:[a-z0-9]+:)?\/\//i, ct = /^\/+|(\/)\/+$/g;
function re(e, n = !1) {
  const t = e.replace(ct, "$1");
  return t ? n || /^[?#]/.test(t) ? t : "/" + t : "";
}
function le(e, n, t) {
  if (ut.test(n))
    return;
  const r = re(e), l = t && re(t);
  let i = "";
  return !l || n.startsWith("/") ? i = r : l.toLowerCase().indexOf(r.toLowerCase()) !== 0 ? i = r + l : i = l, (i || "/") + re(n, !i);
}
function ft(e) {
  const n = {};
  return e.searchParams.forEach((t, r) => {
    n[r] = t;
  }), n;
}
function dt(e) {
  const n = /* @__PURE__ */ new Map(), t = Ee();
  return new Proxy({}, {
    get(r, l) {
      return n.has(l) || Ae(t, () => n.set(l, w(() => e()[l]))), n.get(l)();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    },
    ownKeys() {
      return Reflect.ownKeys(e());
    }
  });
}
const ht = 100, mt = he(), pt = he();
let ce;
function bt(e, n) {
  const t = new URL("http://sar"), r = w((a) => {
    const u = e();
    try {
      return new URL(u, t);
    } catch {
      return console.error(`Invalid path ${u}`), a;
    }
  }, t, {
    equals: (a, u) => a.href === u.href
  }), l = w(() => r().pathname), i = w(() => r().search, !0), o = w(() => r().hash), s = w(() => "");
  return {
    get pathname() {
      return l();
    },
    get search() {
      return i();
    },
    get hash() {
      return o();
    },
    get state() {
      return n();
    },
    get key() {
      return s();
    },
    query: dt(Ce(i, () => ft(r())))
  };
}
function yt(e, n = "", t, r) {
  const { signal: [l, i], utils: o = {} } = it(e), s = o.parsePath || ((m) => m), a = o.renderPath || ((m) => m), u = o.beforeLeave || at(), c = le("", n), p = void 0;
  if (c === void 0)
    throw new Error(`${c} is not a valid base path`);
  c && !l().value && i({ value: c, replace: !0, scroll: !1 });
  const [v, x] = _(!1), $ = async (m) => {
    x(!0);
    try {
      await je(m);
    } finally {
      x(!1);
    }
  }, [R, D] = _(l().value), [O, B] = _(l().state), G = bt(R, O), j = [], S = {
    pattern: c,
    params: {},
    path: () => c,
    outlet: () => null,
    resolvePath(m) {
      return le(c, m);
    }
  };
  if (t)
    try {
      ce = S, S.data = t({
        data: void 0,
        params: {},
        location: G,
        navigate: K(S)
      });
    } finally {
      ce = void 0;
    }
  function I(m, f, b) {
    A(() => {
      if (typeof f == "number") {
        f && (o.go ? u.confirm(f, b) && o.go(f) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const { replace: Q, resolve: H, scroll: P, state: U } = {
        replace: !1,
        resolve: !0,
        scroll: !0,
        ...b
      }, k = H ? m.resolvePath(f) : le("", f);
      if (k === void 0)
        throw new Error(`Path '${f}' is not a routable path`);
      if (j.length >= ht)
        throw new Error("Too many redirects");
      const z = R();
      if ((k !== z || U !== O()) && !Ge) {
        if (u.confirm(k, b)) {
          const xe = j.push({ value: z, replace: Q, scroll: P, state: O() });
          $(() => {
            D(k), B(U);
          }).then(() => {
            j.length === xe && te({
              value: k,
              state: U
            });
          });
        }
      }
    });
  }
  function K(m) {
    return m = m || Pe(pt) || S, (f, b) => I(m, f, b);
  }
  function te(m) {
    const f = j[0];
    f && ((m.value !== f.value || m.state !== f.state) && i({
      ...m,
      replace: f.replace,
      scroll: f.scroll
    }), j.length = 0);
  }
  C(() => {
    const { value: m, state: f } = l();
    A(() => {
      m !== R() && $(() => {
        D(m), B(f);
      });
    });
  });
  {
    let m = function(f) {
      if (f.defaultPrevented || f.button !== 0 || f.metaKey || f.altKey || f.ctrlKey || f.shiftKey)
        return;
      const b = f.composedPath().find((z) => z instanceof Node && z.nodeName.toUpperCase() === "A");
      if (!b || !b.hasAttribute("link"))
        return;
      const Q = b.href;
      if (b.target || !Q && !b.hasAttribute("state"))
        return;
      const H = (b.getAttribute("rel") || "").split(/\s+/);
      if (b.hasAttribute("download") || H && H.includes("external"))
        return;
      const P = new URL(Q);
      if (P.origin !== window.location.origin || c && P.pathname && !P.pathname.toLowerCase().startsWith(c.toLowerCase()))
        return;
      const U = s(P.pathname + P.search + P.hash), k = b.getAttribute("state");
      f.preventDefault(), I(S, U, {
        resolve: !1,
        replace: b.hasAttribute("replace"),
        scroll: !b.hasAttribute("noscroll"),
        state: k && JSON.parse(k)
      });
    };
    Ne(["click"]), document.addEventListener("click", m), de(() => document.removeEventListener("click", m));
  }
  return {
    base: S,
    out: p,
    location: G,
    isRouting: v,
    renderPath: a,
    parsePath: s,
    navigatorFactory: K,
    beforeLeave: u
  };
}
const gt = (e) => {
  const {
    source: n,
    url: t,
    base: r,
    data: l,
    out: i
  } = e, o = n || ot(), s = yt(o, r, l);
  return y(mt.Provider, {
    value: s,
    get children() {
      return e.children;
    }
  });
}, wt = document.getElementById("root");
Fe(() => y(gt, {
  get children() {
    return y(et, {});
  }
}), wt);
