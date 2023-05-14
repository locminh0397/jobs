export function convertIso8601toMMYYY(isoDate: string) {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${month.toString().padStart(2, "0")}/${year}`;
  return formattedDate;
}

export const uploadImage = async (image: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "olkt3lq0");
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dp1jbq9wl/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const urlData = await res.json();
    return { url: urlData.url, public_id: urlData.public_id };
  } catch (error) {
    console.log(error);
  }
};

export const convertCurrency = (amount: number) => {
  // replace this with your desired amount

  const formattedAmount = amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const amountWithoutSymbol = formattedAmount.replace(/₫/g, "");

  return amountWithoutSymbol;
};

export const findByValue = (value: string, data: any[]) => {
  const result = data.find((item) => item.value === value);
  return result.label;
};
