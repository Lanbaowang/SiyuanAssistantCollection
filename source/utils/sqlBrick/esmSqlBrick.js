/* esm.sh - esbuild bundle(sql-bricks@3.0.0) es2022 production */
var mt=Object.create;var X=Object.defineProperty;var Et=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var bt=Object.getPrototypeOf,St=Object.prototype.hasOwnProperty;var jt=(f,u)=>()=>(u||f((u={exports:{}}).exports,u),u.exports),Ot=(f,u)=>{for(var l in u)X(f,l,{get:u[l],enumerable:!0})},M=(f,u,l,_)=>{if(u&&typeof u=="object"||typeof u=="function")for(let m of wt(u))!St.call(f,m)&&m!==l&&X(f,m,{get:()=>u[m],enumerable:!(_=Et(u,m))||_.enumerable});return f},A=(f,u,l)=>(M(f,u,"default"),l&&M(l,u,"default")),ut=(f,u,l)=>(l=f!=null?mt(bt(f)):{},M(u||!f||!f.__esModule?X(l,"default",{value:f,enumerable:!0}):l,f));var Z=jt((at,lt)=>{(function(){"use strict";var f=typeof at<"u",u={placeholder:"$%d"};function l(t){return Object.keys(t).map(function(e){return t[e]})}function _(t){var e=arguments;return delete e[0],Object.keys(e).forEach(function(n){var i=e[n];Object.keys(i).forEach(function(o){t[o]=i[o]})}),t}function m(t){return a.isArray(t)?[].concat(arr):_({},t)}var a={isObject:function(e){return typeof e=="object"},isArray:function(e){return e instanceof Array},isUndefined:function(e){return typeof e>"u"},isNull:function(e){return e===null},isNumber:function(e){return typeof e=="number"},isString:function(e){return typeof e=="string"},isBoolean:function(e){return typeof e=="boolean"},isDate:function(e){return e instanceof Date}};function ht(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n;return-1}function R(t){return a.isUndefined(t)||t===null||Object.keys(t).length==0}function Y(t){return Object.keys(u).forEach(function(e){t[e]||(t[e]=u[e])}),t}function r(t){if(!(this instanceof r))return ot(r,arguments);this.str=t,this.vals=l(arguments).slice(1),a.isArray(this.vals[0])&&(this.vals=this.vals[0])}r.setDefaultOpts=pt;function pt(t){u=_(u,t)}r.prototype.toString=function(e){function n(){if(!e.values.length)return arguments[0];var o=arguments.length>3?parseInt(arguments[1],10):e.value_ix++,h=e.values[o-1];if(a.isUndefined(h))throw new Error("Parameterized sql() ("+i+") requires "+o+" parameter(s) but only "+e.values.length+" parameter(s) were supplied");return a.isObject(r)&&!a.isArray(r)&&r==null?h.toString(e):r.convert(h)}var i=this.str;if(e||(e=_({},u)),e.values||(e.values=[]),e.value_ix||(e.value_ix=1),this.vals.forEach(function(o){e.values.push(o)}),e.value_ix>1&&(e.placeholder=="$%d"?i=i.replace(/\$(\d+)/g,function(o,h){return"$"+(parseInt(h,10)+e.value_ix-1)}):e.placeholder=="?%d"&&(i=i.replace(/\?(\d+)/g,function(o,h){return"?"+parseInt(h,10)+e.value_ix-1}))),e.placeholder=="$%d"?i=i.replace(/\$(?!\d)/g,function(){return"$"+e.value_ix++}):e.placeholder=="?%d"&&(i=i.replace(/\?(?!\d)/g,function(){return"?"+e.value_ix++})),e.parameterized)e.value_ix+=this.vals.length;else if(e.placeholder=="$%d")i=i.replace(/\$(\d+)/g,n);else if(e.placeholder=="?%d")i=i.replace(/\?(\d+)/g,n);else if(e.placeholder=="$")i=i.replace(/\$/g,n);else if(e.placeholder=="?")i=i.replace(/\?/g,n);else if(e.placeholder!="")throw new Error('Unsupported placeholder: "'+e.placeholder+'"');return i},r.val=q;function q(t){if(!(this instanceof q))return new q(t);this.val=t}[s,p,d,v].forEach(function(t){t.defineClause=function(e,n,i){i=i||{},n.clause_id=e,this.prototype.clauses=this.prototype.clauses||[];var o;if(i.after||i.before){if(o=ht(this.prototype.clauses,function(h){return h.clause_id==(i.after||i.before)}),o==-1)throw new Error("Error adding clause "+e+': dependent clause "'+i.after+'" not found');i.after&&o++}else o=this.prototype.clauses.length;this.prototype.clauses.splice(o,0,n)}}),r.select=U(s,c);function s(){return this instanceof s?(s.super_.call(this,"select"),this.select.apply(this,arguments)):new s(g(arguments))}s.prototype.select=function(){return this._addListArgs(arguments,"_columns")},s.prototype.distinct=function(){return this._distinct=!0,this._addListArgs(arguments,"_columns")},s.prototype.into=s.prototype.intoTable=function(t){return this._into=t,this},s.prototype.intoTemp=s.prototype.intoTempTable=function(t){return this._temp=!0,this._into=t,this},s.prototype.from=function(){return this._addListArgs(arguments,"_from")};var K={join:"INNER",innerJoin:"INNER",leftJoin:"LEFT",leftOuterJoin:"LEFT",rightJoin:"RIGHT",rightOuterJoin:"RIGHT",fullJoin:"FULL",fullOuterJoin:"FULL",naturalJoin:"NATURAL INNER",naturalInnerJoin:"NATURAL INNER",naturalLeftJoin:"NATURAL LEFT",naturalLeftOuterJoin:"NATURAL LEFT",naturalRightJoin:"NATURAL RIGHT",naturalRightOuterJoin:"NATURAL RIGHT",naturalFullJoin:"NATURAL FULL",naturalFullOuterJoin:"NATURAL FULL",crossJoin:"CROSS"};Object.keys(K).forEach(function(t){s.prototype[t]=function(){return this._addJoins(arguments,K[t])}}),s.prototype.on=function(t){var e=this.joins[this.joins.length-1];if(a.isArray(e.on)&&!R(e.on))throw new Error("Error adding clause ON: "+e.left_tbl+" JOIN "+e.tbl+" already has a USING clause.");return J(t)?e.on=t:((!e.on||a.isArray(e.on))&&(e.on={}),_(e.on,D(arguments))),this},s.prototype.using=function(t){var e=this.joins[this.joins.length-1];if(!R(e.on)&&!a.isArray(e.on))throw new Error("Error adding clause USING: "+e.left_tbl+" JOIN "+e.tbl+" already has an ON clause.");R(e.on)&&(e.on=[]);var n=g(arguments);return n.forEach(function(i){e.on.indexOf(i)==-1&&e.on.push(i)}),this},s.prototype.where=s.prototype.and=function(){return this._addExpression(arguments,"_where")},s.prototype.having=function(){return this._addExpression(arguments,"_having")},s.prototype.groupBy=s.prototype.group=function(){return this._addListArgs(arguments,"_groupBy")},s.prototype.orderBy=s.prototype.order=function(){return this._addListArgs(arguments,"_orderBy")},s.prototype.of=function(){return this._addListArgs(arguments,"_of")},s.prototype.forUpdate=function(){return this._forUpdate=!0,this},s.prototype.noWait=function(){return this._noWait=!0,this};var P={union:"UNION",unionAll:"UNION ALL",intersect:"INTERSECT",intersectAll:"INTERSECT ALL",except:"EXCEPT",exceptAll:"EXCEPT ALL"};Object.keys(P).forEach(function(t){s.prototype[t]=function(){var e=g(arguments);if(!e.length){var n=new s;n.prev_stmt=this,e=[n]}return this._add(e,"_"+t),n||this}}),s.prototype._toNestedString=function(t){return"("+this._toString(t)+")"+this._aliasToString(t)},s.prototype._aliasToString=function(t){return this._alias?" "+F(this._alias):""},s.prototype.as=function(t){return this._alias=t,this},s.prototype._toString=function(e){return this._columns.length||(this._columns=["*"]),s.super_.prototype._toString.apply(this,arguments)},s.defineClause("select",function(t){return`SELECT ${this._distinct?"DISTINCT ":""}`+(this._columns?L(this._columns,t):"")}),s.defineClause("into",function(t){if(this._into)return`INTO ${this._temp?"TEMP ":""}${w(this._into,t)}`}),s.defineClause("from",function(t){if(this._from){var e=`FROM ${nt(this._from,t)}`;return this.joins&&(e+=" "+this.joins.map(function(n){return n.toString(t)}.bind(this)).join(" ")),e}}),s.defineClause("where",function(t){if(this._where)return`WHERE ${$(this._where,t)}`}),s.defineClause("groupBy",function(t){if(this._groupBy)return`GROUP BY ${L(this._groupBy,t)}`}),s.defineClause("having",function(t){if(this._having)return`HAVING ${$(this._having,t)}`}),Object.keys(P).forEach(function(t){var e=P[t];s.defineClause(t,function(n){var i=this["_"+t];if(i)return i.map(function(o){return e+" "+o._toString(n)}).join(" ")})}),s.defineClause("orderBy",function(t){if(this._orderBy)return`ORDER BY ${L(this._orderBy,t)}`}),s.defineClause("forUpdate",function(t){if(this._forUpdate)return`FOR UPDATE${this._of?` OF ${L(this._of,t)}`:""}`+(this._noWait?" NOWAIT":"")}),r.insert=r.insertInto=U(p,c);function p(t,e){return this instanceof p?(p.super_.call(this,"insert"),this.into.apply(this,arguments)):typeof e=="object"&&!a.isArray(e)?new p(t,e):new p(t,g(l(arguments).slice(1)))}p.prototype.into=function(e,n){if(e&&(this._table=e),n){if(z(n)||a.isArray(n)&&z(n[0]))this.values(n);else if(n.length){this._split_keys_vals_mode=!0,this._values=[{}];var i=g(l(arguments).slice(1));i.forEach(function(o){this._values[0][o]=null}.bind(this))}}return this},p.prototype.values=function(){if(this._split_keys_vals_mode){var e;a.isArray(arguments[0])&&a.isArray(arguments[0][0])?e=arguments[0]:e=[g(arguments)];var n=Object.keys(this._values[0]);e.forEach(function(i,o){this._values[o]||(this._values[o]={}),n.forEach(function(h,Q){this._values[o][h]=i[Q]}.bind(this))}.bind(this))}else a.isArray(arguments[0])&&z(arguments[0][0])?(this._values||(this._values=[]),this._values=this._values.concat(arguments[0])):(this._values||(this._values=[{}]),_(this._values[0],D(arguments)));return this},p.prototype.select=function(){return this._select=r.select.apply(null,arguments),this._select.prev_stmt=this,this._select},p.defineClause("insert",function(){return"INSERT"}),p.defineClause("into",function(t){if(this._table)return`INTO ${w(this._table,t)}`}),p.defineClause("columns",function(t){if(this._values)return"("+L(Object.keys(this._values[0]),t)+")"}),p.defineClause("values",function(t){if(this._select)return this._select._toString(t);var e=Object.keys(this._values[0]);return"VALUES "+this._values.map(function(n){var i=e.map(function(o){return n[o]});return"("+W(i,t).join(", ")+")"}).join(", ")}),r.update=U(d,c);function d(t,e){return this instanceof d?(d.super_.call(this,"update"),this._table=t,e&&this.values(e),this):new d(t,D(l(arguments).slice(1)))}d.prototype.set=d.prototype.values=function(){return this._addToObj(D(arguments),"_values")},d.prototype.where=d.prototype.and=s.prototype.where,d.defineClause("update",function(){return"UPDATE"}),d.defineClause("table",function(t){return w(this._table,t)}),d.defineClause("set",function(t){return"SET "+Object.keys(this._values).map(function(e){return y(e,t)+" = "+E(this._values[e],t)}.bind(this)).join(", ")}),d.defineClause("where",function(t){if(this._where)return`WHERE ${$(this._where,t)}`}),r.delete=r.deleteFrom=U(v,c);function v(t){return this instanceof v?(v.super_.call(this,"delete"),t&&(this._from=t),this):new v(t)}v.prototype.from=function(t){return this._from=t,this},v.prototype.where=v.prototype.and=s.prototype.where,v.defineClause("delete",function(t){return`DELETE FROM ${w(this._from,t)}`}),v.defineClause("where",function(t){if(this._where)return`WHERE ${$(this._where,t)}`}),r.Statement=c;function c(t){this.type=t}c.prototype.clone=function(){var e;[s,p,d,v].forEach(function(i){this instanceof i&&(e=i)}.bind(this));var n=_(new e,this);return n._where&&(n._where=n._where.clone()),n.joins&&(n.joins=n.joins.slice()),n._values&&(a.isArray(n._values)?n._values=n._values.map(function(i){return m(i)}):n._values=m(n._values)),n},c.prototype.toParams=function(e){if(this.prev_stmt)return this.prev_stmt.toParams(e);e||(e={}),_(e,{parameterized:!0,values:[],value_ix:1}),e=Y(e);var n=this._toString(e);return{text:n,values:e.values}},c.prototype.toString=function(e){return e||(e={}),e=Y(e),this.prev_stmt?this.prev_stmt.toString(e):this._toString(e).trim()},c.prototype._toString=function(t){var e=[];return this.clauses.forEach(function(i){var i=i.call(this,t);i&&e.push(i)}.bind(this)),e.join(" ")},c.prototype._add=function(e,n){return this[n]||(this[n]=[]),this[n]=this[n].concat(e),this},c.prototype._addToObj=function(e,n){return this[n]||(this[n]={}),_(this[n],e),this},c.prototype._addListArgs=function(e,n){return this._add(g(e),n)},c.prototype._addExpression=function(e,n){if(e.length<=1&&(e[0]==null||R(e[0])))return this;this[n]||(this[n]=r.and());var i=dt(e);return this[n].expressions=this[n].expressions.concat(i),this},c.prototype._addJoins=function(e,n){if(this.joins||(this.joins=[]),typeof e[1]=="object")var i=[e[0]],o=e[1],h=e[2];else i=g(e);return i.forEach(function(Q){var gt=this.last_join||this._from&&this._from[this._from.length-1];this.joins.push(new B(Q,gt,o,n))}.bind(this)),this.last_join=i[i.length-1],this};function B(t,e,n,i){this.tbl=t,this.left_tbl=e,this.on=n,this.type=i}r.Join=B,B.prototype.autoGenerateOn=function(e,n){return r._joinCriteria(tt(n),V(n),tt(e),V(e))},B.prototype.toString=function(e){var n=this.on,i=w(this.tbl,e);if(/^(natural|cross)/i.test(this.type))return this.type+" JOIN "+i;if(!n||R(n))if(r._joinCriteria){var o=w(this.left_tbl,e);n=this.autoGenerateOn(i,o)}else throw new Error('No join criteria supplied for "'+V(i)+'" join');return a.isArray(n)?(n=n.map(function(h){return y(h)}).join(", "),this.type+" JOIN "+i+" USING ("+n+")"):(J(n)?n=n.toString(e):n=Object.keys(n).map(function(h){return y(h,e)+" = "+y(n[h],e)}).join(" AND "),this.type+" JOIN "+i+" ON "+n)};function g(t){return a.isArray(t[0])?t[0]:typeof t[0]=="string"&&t[0].indexOf(",")>-1?t[0].split(",").map(function(e){return e.trim()}):l(t)}function D(t){if(typeof t[0]=="object")return t[0];var e={};return t[0]!=null&&(e[t[0]]=t[1]),e}function dt(t){var e=!0;if(Object.keys(t).forEach(function(i){var o=t[i];if(!(typeof o!="object"||o instanceof q||o instanceof r||o==null)){e=!1;return}}),e)return t[0]instanceof r&&t.length==1?[t[0]]:[r.equal(t[0],t[1])];var n=[];return Object.keys(t).forEach(function(i){var o=t[i];J(o)?n.push(o):n=n.concat(et(o))}),n}r.and=function(){return new S("AND",g(arguments))},r.or=function(){return new S("OR",g(arguments))};function S(t,e){this.op=t,this.expressions=[],e.forEach(function(n){J(n)?this.expressions.push(n):this.expressions=this.expressions.concat(et(n))}.bind(this))}r.Group=S,S.prototype.clone=function(){return new S(this.op,this.expressions.map(function(e){return e.clone()}))},S.prototype.toString=function(e){e=e||_({},u);var n=Object.keys(this.expressions).map(function(i){return this.expressions[i].toString(e)}.bind(this)).join(" "+this.op+" ");return this.expressions.length>1&&this.parens!==!1&&(n="("+n+")"),n},r.not=function(e){return new T(e)};function T(t){J(t)?this.expressions=[t]:this.expressions=[r.and(t)]}r.Not=T,T.prototype.clone=function(){return new T(this.expressions[0].clone())},T.prototype.toString=function(e){return"NOT "+this.expressions[0].toString(e)};var H={eq:"=",equal:"=",notEq:"<>",lt:"<",lte:"<=",gt:">",gte:">="},_t=["All","Any"];for(var k in H)r[k]=function(t,e,n){return new j(H[t],e,n)}.bind(null,k),_t.forEach(function(t,e){r[t+e]=function(n,i){return new j(H[t],n,i,e.toUpperCase()+" ")}}.bind(null,k)),r[k+"Some"]=r[k+"Any"];function j(t,e,n,i){if(n==null){if(t=="=")return r.isNull(e);if(t=="<>")return r.isNotNull(e)}this.op=t,this.col=e,this.val=n,this.quantifier=i||""}r.Binary=j,j.prototype.clone=function(){return new j(this.op,this.col,this.val)},j.prototype.toString=function(e){var n=y(this.col,e);return n+" "+this.op+" "+this.quantifier+E(this.val,e)},r.like=function(e,n,i){return new x(e,n,i)};function x(t,e,n){this.col=t,this.val=e,this.escape_char=n}r.Like=x,x.prototype.clone=function(){return new x(this.col,this.val,this.escape_char)},x.prototype.toString=function(e){var n=y(this.col,e)+" LIKE "+E(this.val,e);return this.escape_char&&(n+=" ESCAPE '"+this.escape_char+"'"),n},r.between=function(e,n,i){return new C(e,n,i)};function C(t,e,n){this.col=t,this.val1=e,this.val2=n}r.Between=C,C.prototype.clone=function(){return new C(this.col,this.val1,this.val2)},C.prototype.toString=function(t){return y(this.col,t)+" BETWEEN "+E(this.val1,t)+" AND "+E(this.val2,t)},r.isNull=function(e){return new O("IS NULL",e)},r.isNotNull=function(e){return new O("IS NOT NULL",e)};function O(t,e){this.op=t,this.col=e}r.Unary=O,O.prototype.clone=function(){return new O(this.op,this.col)},O.prototype.toString=function(e){return y(this.col,e)+" "+this.op},r.in=function(t,e){return a.isArray(e)||e instanceof c?new N(t,e):new N(t,l(arguments).slice(1))};function N(t,e){this.col=t,this.list=e}r.In=N,N.prototype.clone=function(){var e=this.list instanceof c?this.list.clone():m(this.list);return new N(this.col,e)},N.prototype.toString=function(e){var n=y(this.col,e),i;return a.isArray(this.list)?i=W(this.list,e).join(", "):this.list instanceof c&&(i=this.list._toString(e)),n+" IN ("+i+")"},r.exists=function(t){return new I(t)};function I(t){this.subquery=t}r.Exists=I,I.prototype.clone=function(){return new I(this.subquery.clone())},I.prototype.toString=function(e){return"EXISTS ("+this.subquery._toString(e)+")"};function V(t){var e=" AS ",n=t.indexOf(e);return n==-1&&(e=" ",n=t.indexOf(e)),n>-1?t.slice(n+e.length):t}function tt(t){var e=t.indexOf(" ");return e>-1&&(t=t.slice(0,e)),t[0]=='"'&&t[t.length-1]=='"'&&(t=t.slice(1,-1)),t}function J(t){return t instanceof r||t instanceof S||t instanceof T||t instanceof j||t instanceof O||t instanceof N||t instanceof x||t instanceof C||t instanceof I}function et(t){var e=[];for(var n in t)e.push(r.equal(n,t[n]));return e}function $(t,e){return t.parens=!1,t.expressions&&t.expressions.length==1&&(t.expressions[0].parens=!1),t.toString(e)}r._handleExpression=$;function W(t,e){return t.map(function(n){return E(n,e)})}r._handleValues=W;function E(t,e){return t instanceof c?"("+t._toString(e)+")":t instanceof r?t.toString(e):e.parameterized?(e.values.push(t),e.placeholder.replace("%d",e.value_ix++)):r.convert(t)}r._handleValue=E,r.convert=function(t){for(var e in r.conversions)if(a["is"+e](t))return r.conversions[e](t);throw new Error("value is of an unsupported type and cannot be converted to SQL: "+t)},r.conversions={String:function(t){return"'"+t.replace(/'/g,"''")+"'"},Null:function(){return"null"},Undefined:function(){return"null"},Number:function(t){return t.toString()},Boolean:function(t){return t.toString().toUpperCase()},Date:function(t){return"TIMESTAMP WITH TIME ZONE '"+t.toISOString().replace("T"," ").replace("Z","+00:00")+"'"}};function nt(t,e){return t.map(function(n){return w(n,e)}).join(", ")}r._handleTables=nt;function w(t,e){return y(vt(t),e)}r._handleTable=w;function L(t,e){return t.map(function(n){return y(n,e)}).join(", ")}r._handleColumns=L;var yt=/^[\w\.]+(( AS)? \w+)?$/i;function y(t,e){return t instanceof c?t._toNestedString(e):t instanceof q?E(t.val,e):t instanceof r?t.toString(e):yt.test(t)?it(t):t}r._handleColumn=y;function it(t){var e="",n=t.lastIndexOf(".");n>-1&&(e=t.slice(0,n),t=t.slice(n+1));var i="",o=t.indexOf(" ");return o>-1&&(i=t.slice(o),t=t.slice(0,o)),(e?F(e)+".":"")+F(t)+i}r._quoteColOrTbl=it,r._autoQuoteChar='"';function F(t){return/^\w+$/.test(t)&&(/[A-Z]/.test(t)||t in G)?r._autoQuoteChar+t+r._autoQuoteChar:t}r._autoQuote=F;var G=["all","analyse","analyze","and","any","array","as","asc","asymmetric","authorization","both","case","cast","check","collate","collation","column","constraint","create","cross","current_catalog","current_date","current_role","current_time","current_timestamp","current_user","default","deferrable","desc","distinct","do","else","end","except","false","fetch","for","foreign","freeze","from","full","grant","group","having","ilike","in","initially","inner","intersect","into","is","isnull","join","lateral","leading","left","like","limit","localtime","localtimestamp","natural","not","notnull","null","offset","on","only","or","order","outer","over","overlaps","placing","primary","references","returning","right","select","session_user","similar","some","symmetric","table","then","to","trailing","true","union","unique","user","using","variadic","verbose","when","where","window","with","abort","action","add","after","all","alter","analyze","and","as","asc","attach","autoincrement","before","begin","between","by","cascade","case","cast","check","collate","column","commit","conflict","constraint","create","cross","current_date","current_time","current_timestamp","database","default","deferrable","deferred","delete","desc","detach","distinct","drop","each","else","end","escape","except","exclusive","exists","explain","fail","for","foreign","from","full","glob","group","having","if","ignore","immediate","in","index","indexed","initially","inner","insert","instead","intersect","into","is","isnull","join","key","left","like","limit","match","natural","no","not","notnull","null","of","offset","on","or","order","outer","plan","pragma","primary","query","raise","references","regexp","reindex","release","rename","replace","restrict","right","rollback","row","savepoint","select","set","table","temp","temporary","then","to","transaction","trigger","union","unique","update","using","vacuum","values","view","virtual","when","where"],rt={};G.forEach(function(t){rt[t]=t}),G=rt,r._reserved=G;function z(t){return a.isObject(t)&&!a.isArray(t)}r._aliases={},r.aliasExpansions=function(e){r._aliases=e};function vt(t){return typeof t=="string"&&t in r._aliases?r._aliases[t]+" "+t:t}r.joinCriteria=function(e){if(!e)return r._joinCriteria;r._joinCriteria=e};function U(t,e){function n(){}return Object.create?(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})):(n.prototype=e.prototype,t.super_=e,t.prototype=new n,t.prototype.constructor=t),t}r.inherits=U,r._extension=function(){var t=st(r);return Object.keys(r).forEach(function(e){t[e]=r[e]}),["select","insert","update","delete"].forEach(function(e){var n=r[e];t[e]=st(n),t[e].defineClause=n.defineClause,t[e].prototype.clauses=n.prototype.clauses.slice()}),t.insertInto=t.insert,t.deleteFrom=t.delete,t};function st(t){function e(){if(!(this instanceof e))return ot(e,arguments);t.apply(this,arguments)}return U(e,t)}function ot(t,e){return e=l(e),e.unshift(null),new(t.bind.apply(t,e))}f?lt.exports=r:window.SqlBricks=r})()});var b={};Ot(b,{Between:()=>Gt,Binary:()=>$t,Exists:()=>Qt,Group:()=>qt,In:()=>Wt,Join:()=>Lt,Like:()=>Dt,Not:()=>Jt,Statement:()=>It,Unary:()=>Vt,_aliases:()=>ae,_autoQuote:()=>oe,_autoQuoteChar:()=>se,_extension:()=>he,_handleColumn:()=>ie,_handleColumns:()=>ne,_handleExpression:()=>Mt,_handleTable:()=>ee,_handleTables:()=>te,_handleValue:()=>Zt,_handleValues:()=>Xt,_quoteColOrTbl:()=>re,_reserved:()=>ue,aliasExpansions:()=>le,and:()=>Ut,between:()=>Ft,conversions:()=>Kt,convert:()=>Yt,default:()=>de,exists:()=>zt,inherits:()=>fe,insert:()=>xt,isNotNull:()=>Ht,isNull:()=>Pt,joinCriteria:()=>ce,like:()=>Bt,not:()=>kt,or:()=>Rt,select:()=>Tt,setDefaultOpts:()=>Nt,update:()=>Ct,val:()=>At});var ft=ut(Z());A(b,ut(Z()));var{setDefaultOpts:Nt,val:At,select:Tt,insert:xt,update:Ct,Statement:It,Join:Lt,and:Ut,or:Rt,Group:qt,not:kt,Not:Jt,Binary:$t,like:Bt,Like:Dt,between:Ft,Between:Gt,isNull:Pt,isNotNull:Ht,Unary:Vt,In:Wt,exists:zt,Exists:Qt,_handleExpression:Mt,_handleValues:Xt,_handleValue:Zt,convert:Yt,conversions:Kt,_handleTables:te,_handleTable:ee,_handleColumns:ne,_handleColumn:ie,_quoteColOrTbl:re,_autoQuoteChar:se,_autoQuote:oe,_reserved:ue,_aliases:ae,aliasExpansions:le,joinCriteria:ce,inherits:fe,_extension:he}=ft,{default:ct,...pe}=ft,de=ct!==void 0?ct:pe;export{Gt as Between,$t as Binary,Qt as Exists,qt as Group,Wt as In,Lt as Join,Dt as Like,Jt as Not,It as Statement,Vt as Unary,ae as _aliases,oe as _autoQuote,se as _autoQuoteChar,he as _extension,ie as _handleColumn,ne as _handleColumns,Mt as _handleExpression,ee as _handleTable,te as _handleTables,Zt as _handleValue,Xt as _handleValues,re as _quoteColOrTbl,ue as _reserved,le as aliasExpansions,Ut as and,Ft as between,Kt as conversions,Yt as convert,de as default,zt as exists,fe as inherits,xt as insert,Ht as isNotNull,Pt as isNull,ce as joinCriteria,Bt as like,kt as not,Rt as or,Tt as select,Nt as setDefaultOpts,Ct as update,At as val};
//# sourceMappingURL=sql-bricks.js.map