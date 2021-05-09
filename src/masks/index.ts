export const formatMaskCoinBR = (
  e: React.FormEvent<HTMLInputElement>
): string => {
  let value: string | number = e.currentTarget.value;
  value = value + "";
  value = parseInt(value.replace(/[\D]+/g, ""));
  value = value + "";
  value = value.replace(/([0-9]{2})$/g, ",$1");
  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  return "R$ " + value;
};
