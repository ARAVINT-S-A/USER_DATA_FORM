const $e = (e, n) => e === n, J = {
  equals: $e
};
let _e = ge;
const D = 1, W = 2, fe = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var m = null;
let ne = null, d = null, g = null, N = null, Y = 0;
function Ce(e, n) {
  const t = d, r = m, l = e.length === 0, i = l ? fe : {
    owned: null,
    cleanups: null,
    context: null,
    owner: n === void 0 ? r : n
  }, o = l ? e : () => e(() => j(() => ee(i)));
  m = i, d = null;
  try {
    return B(o, !0);
  } finally {
    d = t, m = r;
  }
}
function $(e, n) {
  n = n ? Object.assign({}, J, n) : J;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: n.equals || void 0
  }, r = (l) => (typeof l == "function" && (l = l(t.value)), pe(t, l));
  return [me.bind(t), r];
}
function E(e, n, t) {
  const r = be(e, n, !1, D);
  Z(r);
}
function x(e, n, t) {
  t = t ? Object.assign({}, J, t) : J;
  const r = be(e, n, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = t.equals || void 0, Z(r), me.bind(r);
}
function j(e) {
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
function Ee(e, n, t) {
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
    const a = j(() => n(s, l, o));
    return l = s, a;
  };
}
function de(e) {
  return m === null || (m.cleanups === null ? m.cleanups = [e] : m.cleanups.push(e)), e;
}
function Ae() {
  return m;
}
function je(e, n) {
  const t = m, r = d;
  m = e, d = null;
  try {
    return B(n, !0);
  } catch (l) {
    oe(l);
  } finally {
    m = t, d = r;
  }
}
function Pe(e) {
  const n = d, t = m;
  return Promise.resolve().then(() => {
    d = n, m = t;
    let r;
    return B(e, !1), d = m = null, r ? r.done : void 0;
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
function ke(e) {
  let n;
  return (n = ve(m, e.id)) !== void 0 ? n : e.defaultValue;
}
function Te(e) {
  const n = x(e), t = x(() => se(n()));
  return t.toArray = () => {
    const r = t();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, t;
}
function me() {
  if (this.sources && this.state)
    if (this.state === D)
      Z(this);
    else {
      const e = g;
      g = null, B(() => V(this), !1), g = e;
    }
  if (d) {
    const e = this.observers ? this.observers.length : 0;
    d.sources ? (d.sources.push(this), d.sourceSlots.push(e)) : (d.sources = [this], d.sourceSlots = [e]), this.observers ? (this.observers.push(d), this.observerSlots.push(d.sources.length - 1)) : (this.observers = [d], this.observerSlots = [d.sources.length - 1]);
  }
  return this.value;
}
function pe(e, n, t) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, n)) && (e.value = n, e.observers && e.observers.length && B(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const i = e.observers[l], o = ne && ne.running;
      o && ne.disposed.has(i), (o ? !i.tState : !i.state) && (i.pure ? g.push(i) : N.push(i), i.observers && we(i)), o || (i.state = D);
    }
    if (g.length > 1e6)
      throw g = [], new Error();
  }, !1)), n;
}
function Z(e) {
  if (!e.fn)
    return;
  ee(e);
  const n = m, t = d, r = Y;
  d = m = e, Oe(e, e.value, r), d = t, m = n;
}
function Oe(e, n, t) {
  let r;
  try {
    r = e.fn(n);
  } catch (l) {
    return e.pure && (e.state = D, e.owned && e.owned.forEach(ee), e.owned = null), e.updatedAt = t + 1, oe(l);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? pe(e, r) : e.value = r, e.updatedAt = t);
}
function be(e, n, t, r = D, l) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: n,
    owner: m,
    context: null,
    pure: t
  };
  return m === null || m !== fe && (m.owned ? m.owned.push(i) : m.owned = [i]), i;
}
function ye(e) {
  if (e.state === 0)
    return;
  if (e.state === W)
    return V(e);
  if (e.suspense && j(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Y); )
    e.state && n.push(e);
  for (let t = n.length - 1; t >= 0; t--)
    if (e = n[t], e.state === D)
      Z(e);
    else if (e.state === W) {
      const r = g;
      g = null, B(() => V(e, n[0]), !1), g = r;
    }
}
function B(e, n) {
  if (g)
    return e();
  let t = !1;
  n || (g = []), N ? t = !0 : N = [], Y++;
  try {
    const r = e();
    return Le(t), r;
  } catch (r) {
    t || (N = null), g = null, oe(r);
  }
}
function Le(e) {
  if (g && (ge(g), g = null), e)
    return;
  const n = N;
  N = null, n.length && B(() => _e(n), !1);
}
function ge(e) {
  for (let n = 0; n < e.length; n++)
    ye(e[n]);
}
function V(e, n) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const r = e.sources[t];
    if (r.sources) {
      const l = r.state;
      l === D ? r !== n && (!r.updatedAt || r.updatedAt < Y) && ye(r) : l === W && V(r, n);
    }
  }
}
function we(e) {
  for (let n = 0; n < e.observers.length; n += 1) {
    const t = e.observers[n];
    t.state || (t.state = W, t.pure ? g.push(t) : N.push(t), t.observers && we(t));
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
    return E(() => l = j(() => (m.context = {
      [e]: r.value
    }, Te(() => r.children))), void 0), l;
  };
}
function y(e, n) {
  return j(() => e(n || {}));
}
const qe = (e) => `Stale read from <${e}>.`;
function L(e) {
  const n = e.keyed, t = x(() => e.when, void 0, {
    equals: (r, l) => n ? r === l : !r == !l
  });
  return x(() => {
    const r = t();
    if (r) {
      const l = e.children;
      return typeof l == "function" && l.length > 0 ? j(() => l(n ? r : () => {
        if (!j(t))
          throw qe("Show");
        return e.when;
      })) : l;
    }
    return e.fallback;
  }, void 0, void 0);
}
function Fe(e, n, t) {
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
        let v = s;
        for (; v < i; )
          u.set(t[v], v++);
      }
      const c = u.get(n[o]);
      if (c != null)
        if (s < c && c < i) {
          let v = o, p = 1, w;
          for (; ++v < l && v < i && !((w = u.get(n[v])) == null || w !== c + p); )
            p++;
          if (p > c - s) {
            const S = n[o];
            for (; s < c; )
              e.insertBefore(t[s++], S);
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
function Ne(e, n, t, r = {}) {
  let l;
  return Ce((i) => {
    l = i, n === document ? e() : A(n, e(), n.firstChild ? null : void 0, t);
  }, r.owner), () => {
    l(), n.textContent = "";
  };
}
function R(e, n, t) {
  let r;
  const l = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, t ? o.content.firstChild.firstChild : o.content.firstChild;
  }, i = n ? () => j(() => document.importNode(r || (r = l()), !0)) : () => (r || (r = l())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function xe(e, n = window.document) {
  const t = n[ae] || (n[ae] = /* @__PURE__ */ new Set());
  for (let r = 0, l = e.length; r < l; r++) {
    const i = e[r];
    t.has(i) || (t.add(i), n.addEventListener(i, Be));
  }
}
function De(e, n, t) {
  t == null ? e.removeAttribute(n) : e.setAttribute(n, t);
}
function A(e, n, t, r) {
  if (t !== void 0 && !r && (r = []), typeof n != "function")
    return X(e, n, r, t);
  E((l) => X(e, n(), l, t), r);
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
      s && s.nodeType === 3 ? s.data = n : s = document.createTextNode(n), t = U(e, t, r, s);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = n : t = e.textContent = n;
  else if (n == null || i === "boolean")
    t = U(e, t, r);
  else {
    if (i === "function")
      return E(() => {
        let s = n();
        for (; typeof s == "function"; )
          s = s();
        t = X(e, s, t, r);
      }), () => t;
    if (Array.isArray(n)) {
      const s = [], a = t && Array.isArray(t);
      if (ie(s, n, t, l))
        return E(() => t = X(e, s, t, r, !0)), () => t;
      if (s.length === 0) {
        if (t = U(e, t, r), o)
          return t;
      } else
        a ? t.length === 0 ? ue(e, s, r) : Fe(e, t, s) : (t && U(e), ue(e, s));
      t = s;
    } else if (n.nodeType) {
      if (Array.isArray(t)) {
        if (o)
          return t = U(e, t, r, n);
        U(e, t, null, n);
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
function U(e, n, t, r) {
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
const Ie = /* @__PURE__ */ R('<div><div class="flex justify-evenly"><div class="flex justify-center align-middle items-center h-screen"><span class="text-white items-center">Thank you </span></div><form id="form10" class="flex justify-center h-screen items-center"><button type="submit" form="form10" class="bg-yellow-400 flex justify-center items-center rounded-md">go back');
function Me() {
  return (() => {
    const e = Ie(), n = e.firstChild, t = n.firstChild, r = t.firstChild;
    return r.firstChild, A(r, () => document.getElementById("name").value, null), e;
  })();
}
const Ue = /* @__PURE__ */ R('<div><div class="flex justify-center items-center h-screen"><div class="grid grid-cols-2 text-white bg-black wx-auto h-auto p-2 m-2"><div class="flex justify-center content-center">Name</div><div class="flex justify-center content-center">Email'), ze = /* @__PURE__ */ R('<div><div class="flex justify-center content-center"></div><div class="flex justify-center content-center">');
function Ke(e) {
  return (() => {
    const n = Ue(), t = n.firstChild, r = t.firstChild;
    return r.firstChild.nextSibling, A(r, () => e.querydata.map((i) => (() => {
      const o = ze(), s = o.firstChild, a = s.nextSibling;
      return A(s, () => i.name), A(a, () => i.Email), E(() => De(o, "key", i.id)), o;
    })()), null), n;
  })();
}
const Qe = /* @__PURE__ */ R('<div><div class="flex justify-center items-center h-screen w-screen"><form id="form4"><input class="rounded-md m-2" id="in" name="name" type="text" placeholder="enter you name to fetch form"><button type="button" form="form4" class="bg-yellow-400 w-12 h-8 rounded-md">submit');
function He(e) {
  const [n, t] = $(!1), r = (i) => {
    l();
  };
  async function l(i) {
    const o = JSON.stringify({
      name: document.getElementById("in").value
    }), s = await fetch("/showform", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: o
    });
    if (s.ok) {
      const a = await s.json();
      t(a);
    } else
      alert("error");
  }
  return [y(L, {
    get when() {
      return !n();
    },
    get children() {
      const i = Qe(), o = i.firstChild, s = o.firstChild, a = s.firstChild, u = a.nextSibling;
      return u.$$click = r, i;
    }
  }), y(L, {
    get when() {
      return n();
    },
    get children() {
      return y(Ke, {
        get querydata() {
          return n();
        }
      });
    }
  })];
}
xe(["click"]);
const Je = /* @__PURE__ */ R('<div class="bg-black w-screen h-screen"><div class="flex justify-center"><h1 class="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">Post your Query</h1></div><main class="flex justify-center"><div class="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md"><div><div class="bg-white rounded-md w-full p-2"><form id="form1"><label for="name">Name:</label><input class="border-black border-spacing-2 shadow-lg shadow-black" type="text" name="name" placeholder="enter name" size="30"><br><input class="hidden" type="text" name="id"><label for="email">Email:</label><input class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" name="Email" placeholder="abcxyz@gmail.com" size="30" required><br><label for="Gender">Gender:</label><input type="radio" name="Gender" value="Male"><label for="Male">Male</label><input type="radio" name="Gender" value="Female"><label for="Female">Female</label><input type="radio" name="Gender" value="Other"><label for="Other">Other</label><br><label for="query">Query</label><textarea class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" name="contents" placeholder="enter query under 50 words" rows="5" cols="40"></textarea><br><input type="checkbox" name="tnc" required><div class="flex justify-evenly"><button type="submit" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Submit</button><button type="reset" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Reset');
function We(e) {
  async function n(t) {
    console.log("2");
    const r = new FormData(t.target), l = Object.fromEntries(r.entries()), i = JSON.stringify(l);
    fetch("/modifydb", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: i
    }).then(console.log("success")).catch(function(o) {
      alert(o);
    });
  }
  return (() => {
    const t = Je(), r = t.firstChild, l = r.nextSibling, i = l.firstChild, o = i.firstChild, s = o.firstChild, a = s.firstChild, u = a.firstChild, c = u.nextSibling, v = c.nextSibling, p = v.nextSibling, w = p.nextSibling, S = w.nextSibling, _ = S.nextSibling, k = _.nextSibling, q = k.nextSibling, G = q.nextSibling, I = G.nextSibling, P = I.nextSibling, C = P.nextSibling, F = C.nextSibling, M = F.nextSibling, te = M.nextSibling, h = te.nextSibling;
    return a.addEventListener("submit", n), E(() => c.value = e.data.name), E(() => p.value = e.data.id), E(() => S.value = e.data.Email), E(() => h.value = e.data.contents), t;
  })();
}
const Ve = /* @__PURE__ */ R('<div><div class="flex justify-center"><h1 class="flex justify-center rounded-full px-2 py-2 w-40 h-10 bg-yellow-400 border-spacing-10">Post your Query</h1></div><main class="flex justify-center"><div class="flex justify-center px-2 py-4 bg-black w-96 h-96 rounded-md"><div><div class="bg-white rounded-md w-full p-2"><form id="form1" method="post"><div><label for="name">Name:</label><input class="border-black border-spacing-2 shadow-lg shadow-black" type="text" name="name" placeholder="enter name" size="30" required id="name"></div><div><label for="email">Email:</label><input class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" id="email" type="text" name="Email" placeholder="abcxyz@gmail.com" size="30" required></div><div><label for="Gender">Gender:</label><input type="radio" name="Gender" value="Male"><label for="Male">Male</label><input type="radio" name="Gender" value="Female"><label for="Female">Female</label><input type="radio" name="Gender" value="Other"><label for="Other">Other</label></div><label for="query">Query</label><textarea class="mx-2 my-2 border-black border-spacing-2 shadow-lg shadow-black" type="text" id="contents" query="contents" name="contents" placeholder="enter query under 50 words" rows="5" cols="40"></textarea><div><input class="text-black" id="tnc" type="checkbox" name="tnc" required><label for="tnc">agree to terms and conditions</label></div><div class="flex justify-evenly"><button type="submit" id="btn" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Submit</button><button type="reset" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full" form="form1">Reset</button></div></form></div></div></div></main><footer class="flex justify-center"><div class="flex justify-evenly"><form id="f2" class="flex justify-center"><div class="flex justify-evenly"><button type="submit" form="f2" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">view submitted form</button></div></form><form id="f3" class="flex justify-center"><div class="flex justify-right"><button type="submit" form="f3" class="bg-yellow-400 px-2 py-2 mx-2 my-2 rounded-full">Edit/delete forms'), Xe = /* @__PURE__ */ R("<div>");
function Ye(e) {
  const [n, t] = $(!1), [r, l] = $(!1), [i, o] = $(!1), s = (p) => {
    t(!0), v(p), Event.preventDefault();
  }, a = () => {
    l(!0), Event.preventDefault();
  };
  async function u() {
    const p = await fetch("/listedit", {
      method: "GET"
    });
    if (p.ok) {
      const w = await p.json();
      o(w);
    } else
      alert("error");
  }
  const c = (p) => {
    p.preventDefault(), console.log("1"), u();
  };
  async function v(p) {
    p.preventDefault();
    const w = new FormData(p.target), S = Object.fromEntries(w.entries()), _ = JSON.stringify(S);
    fetch("/storedb", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: _
    }).then(console.log("success")).catch(function(k) {
      alert(k);
    });
  }
  return (() => {
    const p = Xe();
    return A(p, y(L, {
      get when() {
        return x(() => !n() && !r())() && !i();
      },
      get children() {
        const w = Ve(), S = w.firstChild, _ = S.nextSibling, k = _.firstChild, q = k.firstChild, G = q.firstChild, I = G.firstChild, P = _.nextSibling, C = P.firstChild, F = C.firstChild, M = F.nextSibling;
        return I.addEventListener("submit", s), F.addEventListener("submit", a), M.addEventListener("submit", c), w;
      }
    }), null), A(p, y(L, {
      get when() {
        return n();
      },
      get children() {
        return y(Me, {});
      }
    }), null), A(p, y(L, {
      get when() {
        return x(() => !!r())() && !n();
      },
      get children() {
        return y(He, {});
      }
    }), null), A(p, y(L, {
      get when() {
        return x(() => !!i())() && !n();
      },
      get children() {
        return y(We, {
          get data() {
            return i();
          }
        });
      }
    }), null), p;
  })();
}
const Ze = /* @__PURE__ */ R('<div class="bg-gray-800 w-screen h-screen">');
function et() {
  const [e, n] = $(!1), [t, r] = $(!1);
  return (() => {
    const l = Ze();
    return A(l, y(L, {
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
  const i = (s) => typeof s == "string" ? { value: s } : s, o = nt($(i(e()), { equals: (s, a) => s.value === a.value }), void 0, (s) => (!l && n(s), s));
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
      signal: $({ value: "" })
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
  const n = /* @__PURE__ */ new Map(), t = Ae();
  return new Proxy({}, {
    get(r, l) {
      return n.has(l) || je(t, () => n.set(l, x(() => e()[l]))), n.get(l)();
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
  const t = new URL("http://sar"), r = x((a) => {
    const u = e();
    try {
      return new URL(u, t);
    } catch {
      return console.error(`Invalid path ${u}`), a;
    }
  }, t, {
    equals: (a, u) => a.href === u.href
  }), l = x(() => r().pathname), i = x(() => r().search, !0), o = x(() => r().hash), s = x(() => "");
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
    query: dt(Ee(i, () => ft(r())))
  };
}
function yt(e, n = "", t, r) {
  const { signal: [l, i], utils: o = {} } = it(e), s = o.parsePath || ((h) => h), a = o.renderPath || ((h) => h), u = o.beforeLeave || at(), c = le("", n), v = void 0;
  if (c === void 0)
    throw new Error(`${c} is not a valid base path`);
  c && !l().value && i({ value: c, replace: !0, scroll: !1 });
  const [p, w] = $(!1), S = async (h) => {
    w(!0);
    try {
      await Pe(h);
    } finally {
      w(!1);
    }
  }, [_, k] = $(l().value), [q, G] = $(l().state), I = bt(_, q), P = [], C = {
    pattern: c,
    params: {},
    path: () => c,
    outlet: () => null,
    resolvePath(h) {
      return le(c, h);
    }
  };
  if (t)
    try {
      ce = C, C.data = t({
        data: void 0,
        params: {},
        location: I,
        navigate: M(C)
      });
    } finally {
      ce = void 0;
    }
  function F(h, f, b) {
    j(() => {
      if (typeof f == "number") {
        f && (o.go ? u.confirm(f, b) && o.go(f) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const { replace: Q, resolve: H, scroll: T, state: z } = {
        replace: !1,
        resolve: !0,
        scroll: !0,
        ...b
      }, O = H ? h.resolvePath(f) : le("", f);
      if (O === void 0)
        throw new Error(`Path '${f}' is not a routable path`);
      if (P.length >= ht)
        throw new Error("Too many redirects");
      const K = _();
      if ((O !== K || z !== q()) && !Ge) {
        if (u.confirm(O, b)) {
          const Se = P.push({ value: K, replace: Q, scroll: T, state: q() });
          S(() => {
            k(O), G(z);
          }).then(() => {
            P.length === Se && te({
              value: O,
              state: z
            });
          });
        }
      }
    });
  }
  function M(h) {
    return h = h || ke(pt) || C, (f, b) => F(h, f, b);
  }
  function te(h) {
    const f = P[0];
    f && ((h.value !== f.value || h.state !== f.state) && i({
      ...h,
      replace: f.replace,
      scroll: f.scroll
    }), P.length = 0);
  }
  E(() => {
    const { value: h, state: f } = l();
    j(() => {
      h !== _() && S(() => {
        k(h), G(f);
      });
    });
  });
  {
    let h = function(f) {
      if (f.defaultPrevented || f.button !== 0 || f.metaKey || f.altKey || f.ctrlKey || f.shiftKey)
        return;
      const b = f.composedPath().find((K) => K instanceof Node && K.nodeName.toUpperCase() === "A");
      if (!b || !b.hasAttribute("link"))
        return;
      const Q = b.href;
      if (b.target || !Q && !b.hasAttribute("state"))
        return;
      const H = (b.getAttribute("rel") || "").split(/\s+/);
      if (b.hasAttribute("download") || H && H.includes("external"))
        return;
      const T = new URL(Q);
      if (T.origin !== window.location.origin || c && T.pathname && !T.pathname.toLowerCase().startsWith(c.toLowerCase()))
        return;
      const z = s(T.pathname + T.search + T.hash), O = b.getAttribute("state");
      f.preventDefault(), F(C, z, {
        resolve: !1,
        replace: b.hasAttribute("replace"),
        scroll: !b.hasAttribute("noscroll"),
        state: O && JSON.parse(O)
      });
    };
    xe(["click"]), document.addEventListener("click", h), de(() => document.removeEventListener("click", h));
  }
  return {
    base: C,
    out: v,
    location: I,
    isRouting: p,
    renderPath: a,
    parsePath: s,
    navigatorFactory: M,
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
Ne(() => y(gt, {
  get children() {
    return y(et, {});
  }
}), wt);
