function changeCountry(countryCode) {
    console.log(countryCode);
    window.location.href = `?countryCode=${countryCode}`;
}