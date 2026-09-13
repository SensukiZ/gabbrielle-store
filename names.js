// Only product names and categories are normalized; identifiers stay untouched.
function tidyProductText(value){
 const units={ml:'ml',cl:'cl',dl:'dl',l:'L',mg:'mg',g:'g',kg:'kg',oz:'oz',lb:'lb',lbs:'lbs',mm:'mm',cm:'cm',m:'m',pc:'pc',pcs:'pcs'};
 return String(value??'').trim().replace(/\s+/gu,' ').replace(/\p{L}+(?:['’]\p{L}+)*/gu,word=>{
  const lower=word.toLowerCase();
  if(Object.hasOwn(units,lower))return units[lower];
  // Retain intentional mixed-case brand spelling, such as iPhone.
  if(word!==lower&&word!==word.toUpperCase()&&/[\p{Ll}][\p{Lu}]/u.test(word))return word;
  return lower.charAt(0).toUpperCase()+lower.slice(1);
 });
}
