
//  =============================================
//  =====        =  ====  =       ==        =====
//  ========  ====   ==   =  ====  =  ===========
//  ========  =====  ==  ==  ====  =  ===========
//  ========  =====  ==  ==  ====  =  ===========
//  ========  ======    ===       ==      =======
//  ========  =======  ====  =======  ===========
//  ========  =======  ====  =======  ===========
//  ========  =======  ====  =======  ===========
//  ========  =======  ====  =======        =====
//  =============================================

export const typeOf = (variable) => Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()

//  ======================================================
//  =======     ==  ====  =       ==       ==  ====  =====
//  ======  ===  =  ====  =  ====  =  ====  =   ==   =====
//  =====  =======  ====  =  ====  =  ====  ==  ==  ======
//  =====  =======  ====  =  ===   =  ===   ==  ==  ======
//  =====  =======  ====  =      ===      =====    =======
//  =====  =======  ====  =  ====  =  ====  ====  ========
//  =====  =======  ====  =  ====  =  ====  ====  ========
//  ======  ===  =   ==   =  ====  =  ====  ====  ========
//  =======     ===      ==  ====  =  ====  ====  ========
//  ======================================================

/**
 * curry :: ((a,b) → c) → (a → b → c)
 *
 * 2-args currying
 *
 * @param {*} b
 * @param {*} c
 * @returns {Function}
 */
export const curry = (f) => (x, y) => f(x)(y)

//  ===================================================================================================
//  =======     ====    ===  =====  =      ===    =  =======  ====  ====        ===    ===       ======
//  ======  ===  ==  ==  ==   ===   =  ===  ===  ==   ======  ===    ======  =====  ==  ==  ====  =====
//  =====  =======  ====  =  =   =  =  ====  ==  ==    =====  ==  ==  =====  ====  ====  =  ====  =====
//  =====  =======  ====  =  == ==  =  ===  ===  ==  ==  ===  =  ====  ====  ====  ====  =  ===   =====
//  =====  =======  ====  =  =====  =      ====  ==  ===  ==  =  ====  ====  ====  ====  =      =======
//  =====  =======  ====  =  =====  =  ===  ===  ==  ====  =  =        ====  ====  ====  =  ====  =====
//  =====  =======  ====  =  =====  =  ====  ==  ==  =====    =  ====  ====  ====  ====  =  ====  =====
//  ======  ===  ==  ==  ==  =====  =  ===  ===  ==  ======   =  ====  ====  =====  ==  ==  ====  =====
//  =======     ====    ===  =====  =      ===    =  =======  =  ====  ====  ======    ===  ====  =====
//  ===================================================================================================

const COMBINATOR = {
	/**
	 * I :: a → a
	 *
	 * identity
	 *
	 * @param {*} a
	 * @returns {*} a
	 */
	I: x => x,
	/**
	 * K :: a → b → a
	 *
	 * constant
	 *
	 * @param {*} a
	 * @returns {*} a
	 */
	K: x => () => x,
	/**
	* A :: (a → b) → a → b
	*
	* apply
	* @param {Function} f
	* @returns {Function} f
	*/
	A: (f) => (x) => f(x),
	/**
	* U :: (a → a) → a
	*
	* universal
	* @param {Function} f
	* @returns {Function} f
	*/
	U: (f) => f(f),
	/**
	* Y :: (a → a) → a
	*
	* fixed-point
	* @param {Function} f
	* @returns {Function} f
	*/
	Y: (f) => COMBINATOR.U((g) => f((x) => g(g)(x))),
	/**
	* C :: (a → b → c) → b → a → c
	*
	* flip
	* @param {Function} f
	* @returns {Function} f
	*/
	C: (f) => (x) => (y) => f(y)(x),
	/**
	* S :: (a → b → c) → (a → b) → a → c
	*
	* substitution
	* @param {Function} f
	* @returns {Function} f
	*/
	S: (f) => (g) => (x) => f(x)(g(x)),
	/**
	* SI :: (a → b) → (a → b → c) → a → c
	*
	* inverted S
	* @param {Function} f
	* @returns {Function} f
	*/
	SI: (f) => (g) => (x) => g(x)(f(x)),
	/**
	* SA :: (a → b) → (a → b → c) → a → c
	*
	* async S
	* @param {Function} f
	* @returns {Function} f
	*/
	SA: (f) => (g) => async (x) => f(x)(await g(x)),
	/**
	* SIA :: (a → b) → (a → b → c) → a → c
	*
	* async SI
	* @param {Function} f
	* @returns {Function} f
	*/
	SIA: (f) => (g) => async (x) => g(x)(await f(x))
}

export const identity = COMBINATOR.I
export const constant = COMBINATOR.K
export const universal = COMBINATOR.U
export const fix = COMBINATOR.Y
export const flip = COMBINATOR.C
export const substitution = COMBINATOR.S
export const substitutionI = COMBINATOR.SI
export const substitutionAsync = COMBINATOR.SA
export const substitutionIAsync = COMBINATOR.SIA

export const overstep = (f) => (x) => {
	f(x)
	return x
}
export const functionSum = (f) => (x) => (y) => x + f(y)

//  ========================================================================================
//  =======     ====    ===  =======  =       ==    =        =    ===    ===  =======  =====
//  ======  ===  ==  ==  ==   ======  =  ====  ==  =====  =====  ===  ==  ==   ======  =====
//  =====  =======  ====  =    =====  =  ====  ==  =====  =====  ==  ====  =    =====  =====
//  =====  =======  ====  =  ==  ===  =  ====  ==  =====  =====  ==  ====  =  ==  ===  =====
//  =====  =======  ====  =  ===  ==  =  ====  ==  =====  =====  ==  ====  =  ===  ==  =====
//  =====  =======  ====  =  ====  =  =  ====  ==  =====  =====  ==  ====  =  ====  =  =====
//  =====  =======  ====  =  =====    =  ====  ==  =====  =====  ==  ====  =  =====    =====
//  ======  ===  ==  ==  ==  ======   =  ====  ==  =====  =====  ===  ==  ==  ======   =====
//  =======     ====    ===  =======  =       ==    ====  ====    ===    ===  =======  =====
//  ========================================================================================

export const ifThen = (predicate) => ([onTrue, onFalse]) => (x) => predicate(x)
	? onTrue(x)
	: (onFalse)
		? onFalse(x)
		: x

export const switchCase = (condition) => (cases) => (x) => {
	const caseF = cases[condition(x)]
	return caseF ? caseF(x) : cases.default ? cases.default(x) : undefined
}

export const switchType = switchCase(typeOf)

//  ===================================================================
//  =====  =======  =  ====  =  =====  =      ===        =       ======
//  =====   ======  =  ====  =   ===   =  ===  ==  =======  ====  =====
//  =====    =====  =  ====  =  =   =  =  ====  =  =======  ====  =====
//  =====  ==  ===  =  ====  =  == ==  =  ===  ==  =======  ===   =====
//  =====  ===  ==  =  ====  =  =====  =      ===      ===      =======
//  =====  ====  =  =  ====  =  =====  =  ===  ==  =======  ====  =====
//  =====  =====    =  ====  =  =====  =  ====  =  =======  ====  =====
//  =====  ======   =   ==   =  =====  =  ===  ==  =======  ====  =====
//  =====  =======  ==      ==  =====  =      ===        =  ====  =====
//  ===================================================================

export const sum = (x) => (y) => x + y
export const gt = (x) => (y) => x < y

//  ==============================================================
//  ======      ==        =       ==    =  =======  ==      ======
//  =====  ====  ====  ====  ====  ==  ==   ======  =   ==   =====
//  =====  ====  ====  ====  ====  ==  ==    =====  =  ====  =====
//  ======  =========  ====  ===   ==  ==  ==  ===  =  ===========
//  ========  =======  ====      ====  ==  ===  ==  =  ===========
//  ==========  =====  ====  ====  ==  ==  ====  =  =  ===   =====
//  =====  ====  ====  ====  ====  ==  ==  =====    =  ====  =====
//  =====  ====  ====  ====  ====  ==  ==  ======   =   ==   =====
//  ======      =====  ====  ====  =    =  =======  ==      ======
//  ==============================================================

export const stringTest = (re) => (str) => re.test(str)
export const stringReplace = (re) => (to) => (str) => str.replace(re, to)
export const stringMatch = (re) => (str) => str.match(re) || []
export const stringCut = (re) => stringReplace(re)('')
export const stringSplit = (re) => (str) => str.split(re)
export const stringTrim = (str) => str.trim()

//  ======================================================
//  ========  ====       ==       =====  ====  ====  =====
//  =======    ===  ====  =  ====  ===    ===   ==   =====
//  ======  ==  ==  ====  =  ====  ==  ==  ===  ==  ======
//  =====  ====  =  ===   =  ===   =  ====  ==  ==  ======
//  =====  ====  =      ===      ===  ====  ===    =======
//  =====        =  ====  =  ====  =        ====  ========
//  =====  ====  =  ====  =  ====  =  ====  ====  ========
//  =====  ====  =  ====  =  ====  =  ====  ====  ========
//  =====  ====  =  ====  =  ====  =  ====  ====  ========
//  ======================================================

export const getArray = (x) => (typeOf(x) === 'array' ? x : x ? [x] : [])
export const getArrayLength = (xs) => xs.length
export const map = (f) => (xs) => xs.map(f)
export const filter = (f) => (xs) => xs.filter(f)
export const slice = (from, to) => (xs) => xs.slice(from, to)
export const join = (delim) => (xs) => xs.join(delim)
export const removeEmpties = filter((x) => !!x)
export const removeUndefineds = filter((x) => x !== undefined)
export const concat = (array) => (x) => array.concat(x)
export const reduce = (f) => (init) => (xs) => xs.reduce(
	curry(f),
	switchType({
		object: constant({}),
		array: constant([]),
		default: identity
	})(init)
)
export const reduceDirty = (f) => (init) => (xs) => getArray(xs).reduce(curry(flip(f)), getArray(init))
export const flatten = reduce((acc) => pipe([ifThen(isArray)([flatten, identity]), concat(acc)]))([])
export const arrayHead = (xs) => xs[0]
export const arrayTail = ([, ...t]) => t
export const arrayLast = (xs) => xs[xs.length - 1]
export const arrayInit = slice(0, -1)
export const EMPTY_ARRAY = () => []
export const arrayHas = (x) => pipe([filter(isEqual(x)), isArrayFilled])
export const chunkArrayFrom = (start = 0) => (size) => (value) => {
	let i = start
	return reduce((acc) => (x) => {
		if (acc[i] === undefined) acc[i] = []
		const chunk = acc[i]
		chunk.push(x)
		if (chunk.length === size) i += 1
		return acc
	})([])(value)
}
export const chunkArray = chunkArrayFrom()

export const removeEmptiesByProp = property => filter((x) => !!x[property])
export const removeDuplicatedProp = property => pipe([reduce((acc) => (x) => {
	acc[x[property]] = x
	return acc
})({}), Object.values])

//  ===============================================================
//  =======    ===      =======    =        ===     ==        =====
//  ======  ==  ==  ===  =======  ==  ========  ===  ====  ========
//  =====  ====  =  ====  ======  ==  =======  ==========  ========
//  =====  ====  =  ===  =======  ==  =======  ==========  ========
//  =====  ====  =      ========  ==      ===  ==========  ========
//  =====  ====  =  ===  =======  ==  =======  ==========  ========
//  =====  ====  =  ====  =  ===  ==  =======  ==========  ========
//  ======  ==  ==  ===  ==  ===  ==  ========  ===  ====  ========
//  =======    ===      ====     ===        ===     =====  ========
//  ===============================================================

export const forIn = (f) => (o) => {
	const props = Reflect.ownKeys(o)
	for (let i = 0; i < props.length; i += 1) {
		const prop = props[i]
		f(prop)(o[prop])
	}
	return o
}
export const methodEmpty = (m) => (o) => (o[m] ? o[m]() : o)
export const method = (m) => (arg) => (o) => (o[m] ? o[m](arg) : o)
export const methodI = (m) => (o) => (arg) => (o[m] ? o[m](arg) : o)
export const methodIOverstep = (m) => (arg) => (o) => {
	method(m)(arg)(o)
	return o
}
export const apply = (m) => (o) => (args) => o[m](...args)
export const prop = (name) => (o) => o[name]
export const keys = (o) => Object.keys(o)
export const getInstance = (constructor) => (...args) => new constructor(...args)
export const getInstanceEmpty = (constructor) => new constructor()
export const switchProp = (o) => (x) => {
	const props = Reflect.ownKeys(o)
	for (let i = 0; i < props.length; i += 1) {
		const property = props[i]
		if (x[property]) return o[property](x)
		if (x.default) return x.default(x)
	}
	return undefined
}
export const NULL = () => null
export const climb = (f) => fix((fr) => ([h, ...t]) => (o) => (t.length ? fr(t)(f(h)(o)) : f(h)(o)))

//  =========================================================================
//  =======     ====    ===  =====  =       ====    ====      ==        =====
//  ======  ===  ==  ==  ==   ===   =  ====  ==  ==  ==  ====  =  ===========
//  =====  =======  ====  =  =   =  =  ====  =  ====  =  ====  =  ===========
//  =====  =======  ====  =  == ==  =  ====  =  ====  ==  ======  ===========
//  =====  =======  ====  =  =====  =       ==  ====  ====  ====      =======
//  =====  =======  ====  =  =====  =  =======  ====  ======  ==  ===========
//  =====  =======  ====  =  =====  =  =======  ====  =  ====  =  ===========
//  ======  ===  ==  ==  ==  =====  =  ========  ==  ==  ====  =  ===========
//  =======     ====    ===  =====  =  =========    ====      ==        =====
//  =========================================================================

export const pipe = reduce((acc) => (f) => (x) => f(acc(x)))(identity)
export const pipeAsync = reduce((acc) => (f) => async (x) => f(await acc(x)))(identity)

//  ==================================================
//  =====  =========    ====      ==    ===     ======
//  =====  ========  ==  ==   ==   ==  ===  ===  =====
//  =====  =======  ====  =  ====  ==  ==  ===========
//  =====  =======  ====  =  ========  ==  ===========
//  =====  =======  ====  =  ========  ==  ===========
//  =====  =======  ====  =  ===   ==  ==  ===========
//  =====  =======  ====  =  ====  ==  ==  ===========
//  =====  ========  ==  ==   ==   ==  ===  ===  =====
//  =====        ===    ====      ==    ===     ======
//  ==================================================

export const toBoolean = (x) => !!x
export const not = (x) => !x
export const and = (x) => (y) => toBoolean(x && y)
export const or = (x) => (y) => toBoolean(x || y)
export const TRUE = () => true
export const FALSE = () => false
export const andArray = reduce(and)(true)
export const orArray = reduce(or)(false)
export const isEqual = (sample) => (x) => x === sample
export const isNotEqual = pipe([isEqual, not])
export const isNumber = (x) => typeOf(x) === 'number'
export const isString = (x) => typeOf(x) === 'string'
export const isRegExp = (x) => typeOf(x) === 'regexp'
export const isFunction = (x) => typeOf(x) === 'function'
export const isIterator = (x) => typeOf(x) === 'iterator'
export const isArray = (x) => typeOf(x) === 'array'
export const isObject = (x) => typeOf(x) === 'object'
export const isBlob = (x) => {
	const type = typeOf(x)
	return type === 'blob' || type === 'file'
}

export const isGUID = stringTest(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)

//  =========================================================================================
//  =====        =   ==   =    ==      ==        ====  ====  =======  ===     ==        =====
//  =====  ========  ==  ===  ==  ====  ====  ======    ===   ======  ==  ===  =  ===========
//  =====  ========  ==  ===  ==  ====  ====  =====  ==  ==    =====  =  =======  ===========
//  =====  =========    ====  ===  =========  ====  ====  =  ==  ===  =  =======  ===========
//  =====      ======  =====  =====  =======  ====  ====  =  ===  ==  =  =======      =======
//  =====  =========    ====  =======  =====  ====        =  ====  =  =  =======  ===========
//  =====  ========  ==  ===  ==  ====  ====  ====  ====  =  =====    =  =======  ===========
//  =====  ========  ==  ===  ==  ====  ====  ====  ====  =  ======   ==  ===  =  ===========
//  =====        =  ====  =    ==      =====  ====  ====  =  =======  ===     ==        =====
//  =========================================================================================

export const isNull = (x) => x === null
export const isNotNull = pipe([isNull, not])
export const isUndefined = (x) => x === undefined
export const isDefined = pipe([isUndefined, not])
export const isZero = (x) => x === 0
export const isNotZero = pipe([isZero, not])
export const isNaN = (x) => typeOf(x) === 'number' && x.toString() === 'NaN'
export const isNotNaN = pipe([isNaN, not])
export const isNumberFilled = (x) => isNumber(x) && isNotZero(x) && isNotNaN(x)
export const isStringEmpty = (x) => x === ''
export const isStringFilled = pipe([isStringEmpty, not])
export const isArrayFilled = pipe([filter(isDefined), prop('length'), toBoolean])
export const isArrayEmpty = pipe([isArrayFilled, not])
export const isObjectFilled = ifThen(isObject)([pipe([keys, isArrayFilled]), FALSE])
export const isObjectEmpty = pipe([keys, isArrayEmpty])
export const isExists = (x) => isDefined(x) && isNotNull(x)
export const isNotExists = pipe([isExists, not])
export const isFilled = ifThen(isExists)([
	switchType({
		number: isNumberFilled,
		string: isStringFilled,
		array: isArrayFilled,
		object: isObjectFilled,
		null: FALSE,
		default: TRUE
	}),
	toBoolean
])
export const isNotFilled = pipe([isFilled, not])

export const hasOwnProp = method('hasOwnProperty')
export const hasProp = (name) => (o) => o[name]
export const isPropExists = (name) => pipe([prop(name), isExists])
export const isPropFilled = (name) => pipe([prop(name), isFilled])

//  ====================================
//  =====        =       ==  ====  =====
//  ========  ====  ====  =   ==   =====
//  ========  ====  ====  ==  ==  ======
//  ========  ====  ===   ==  ==  ======
//  ========  ====      =====    =======
//  ========  ====  ====  ====  ========
//  ========  ====  ====  ====  ========
//  ========  ====  ====  ====  ========
//  ========  ====  ====  ====  ========
//  ====================================

export const tryCatch = (tryer) => (catcher) => (data) => {
	try {
		return tryer(data)
	} catch (err) {
		return catcher(err)(data)
	}
}

export const throwError = (msg) => {
	throw new Error(msg)
}
export const throwCatchedError = (err) => (msg) => {
	throw new Error(`${msg}\n${err}`)
}

//  ===========================================================================
//  =======     ====    ===  =======  ==      ====    ===  =======        =====
//  ======  ===  ==  ==  ==   ======  =  ====  ==  ==  ==  =======  ===========
//  =====  =======  ====  =    =====  =  ====  =  ====  =  =======  ===========
//  =====  =======  ====  =  ==  ===  ==  ======  ====  =  =======  ===========
//  =====  =======  ====  =  ===  ==  ====  ====  ====  =  =======      =======
//  =====  =======  ====  =  ====  =  ======  ==  ====  =  =======  ===========
//  =====  =======  ====  =  =====    =  ====  =  ====  =  =======  ===========
//  ======  ===  ==  ==  ==  ======   =  ====  ==  ==  ==  =======  ===========
//  =======     ====    ===  =======  ==      ====    ===        =        =====
//  ===========================================================================

export const inspect = overstep(console.log)

export const log = (...args) => {
	console.log('------- Begin')
	args.map((el) => console.log(el))
	console.log('------- End')
	return args.length > 1 ? args : args[0]
}
