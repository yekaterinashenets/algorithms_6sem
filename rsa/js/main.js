const p = 11, q = 13;
const n = p * q; // 143
const m = 3; // m < n


/* HELPERS */
eulerFunction = (n) => {
  let res = n;
  for (let i = 2; i * i <= n; ++i)
    if (n % i == 0) {
      while (n % i == 0)
        n /= i;
      res -= res / i;
    }
  if (n > 1)
    res -= res / n;
  return res;
}

isCoprime = (a, b) => {
  var n;
  while (b) {
    n = a % b;
    a = b;
    b = n;
  }
  if (Math.abs(a) == 1) {
    return true;
  }
  return false;
}

isPrime = (n) => {
  if (n < 2) return false;
  for (var i = 2; i < n; i++) {
    if (n % i == 0)
      return false;
  }
  return true;
}

generatePrimes = (max) => {
  let res = [];
  for (var i = 0; i < max; i++) {
    if (isPrime(i))
      res.push(i);
  }
  return res;
}

powMod = (msg, pow, mod) => {
  let m = msg, i = 0;
  m = m % mod;
  while (i < pow - 1) {
    m = (m * msg) % mod;
    i++;
  }
  return m;
}

extendedGCD = (e, fi) => {
  let u1 = 1,
    u2 = 0,
    u3 = fi,
    v1 = 0,
    v2 = 1,
    v3 = e;

  while (v3 != 0) {
    let q = Math.floor(u3 / v3),
      t1 = u1 - q * v1,
      t2 = u2 - q * v2,
      t3 = u3 - q * v3, z;

    u1 = v1
    u2 = v2
    u3 = v3

    v1 = t1
    v2 = t2
    v3 = t3
    z = 1
  }
  let uu = u1,
    vv = u2,
    inverse;
  if (vv < 0) {
    inverse = vv + fi
  } else {
    inverse = vv
  }
  return inverse
}

/* HELPERS */

getE = (fi) => {
  let coprimes = generatePrimes(fi).filter((prime) => isCoprime(prime, fi));
  return coprimes[0];
}

encrypt = (publicKey, message) => {
  return powMod(message, publicKey.e, publicKey.n);
}

decrypt = (privateKey, data) => {
  return powMod(data, privateKey.d, publicKey.n);
}

generatePublicKey = (e, n) => ({ e, n })

generatePrivateKey = (e, fi, n) => {
  let d = extendedGCD(e, fi);
  return { d, n };
}

generatePrivateKeyByPublic = (publicKey) => ({
  d: extendedGCD(publicKey.e, eulerFunction(publicKey.n)),
  n: publicKey.n
})

const fi = (p - 1) * (q - 1);
const e = getE(fi);

const publicKey = generatePublicKey(e, n);
const privateKey = generatePrivateKey(e, fi, n);

const codedMessage = encrypt(publicKey, m);
const encodedMessage = decrypt(privateKey, codedMessage);

console.log('public key: ', publicKey);
console.log('private key: ', privateKey);
console.log('coded message: ', codedMessage);
console.log('encoded message: ', encodedMessage);
console.log('\n............\n');
console.log('private key obtained by public: ', generatePrivateKeyByPublic(publicKey));
