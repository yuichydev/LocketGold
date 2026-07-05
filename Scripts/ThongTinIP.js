const url = "http://ip-api.com/json/?fields=8450015&lang=VI";

$httpClient.get(url, function (error, response, data) {
  if (error) {
    $done({
      title: "THONG TIN PROXY",
      content: "Khong the lay thong tin IP",
    });
    return;
  }

  const jsonData = JSON.parse(data);
  const params = getParams($argument || "");
  const emoji = getFlagEmoji(jsonData.countryCode || "");

  $done({
    title: "THONG TIN PROXY",
    content: [
      `IP: ${jsonData.query}`,
      `ISP: ${jsonData.isp}`,
      `ASN: ${jsonData.as}`,
      `Khu vuc: ${emoji}${jsonData.country}`,
      `Thanh pho: ${jsonData.city}`,
      `Mui gio: ${jsonData.timezone}`,
      `Kinh, vi do: ${jsonData.lon},${jsonData.lat}`,
      `Tien te: ${jsonData.currency}`,
    ].join("\n"),
    icon: params.icon,
    "icon-color": params.color,
  });
});

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}

function getParams(argument) {
  if (!argument) return {};

  return Object.fromEntries(
    argument
      .split("&")
      .map((item) => item.split("="))
      .map(([key, value = ""]) => [key, decodeURIComponent(value)])
  );
}
