import React from "react";

function GithubIcon({ size = 50, fill = "#030404" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 600 600"
      height={size}
      width={size}
    >
      <path
        fill={fill}
        fillRule="nonzero"
        d="M67.737 37.544v-2.735h-2.738v-2.735H26.694v2.735h-2.738v2.735H21.22v38.309h2.736v2.735h2.738v2.738h38.305v-2.738h2.738v-2.735h2.735V37.544h-2.735zm-7.422 11.922v14.468h-3.617v3.618h-3.617v3.617H38.612v-3.617h-3.617v-3.618h-3.617V49.466h3.617v-3.617h3.617v-3.618h14.469v3.618h3.617v3.617h3.617z"
        transform="translate(-258.513 -390.735) scale(12.1822)"
      ></path>
      <path
        fill={fill}
        d="M259.253 413.826v-11.107h13.582V385.08h-32.171v-22.849h-29.667v-22.849h-29.668v-91.397h28.479l-1.412-4.618-3.847 1.177-7.38-24.139 3.847-1.176-1.845-6.035 3.848-1.176-1.845-6.035 15.39-4.705 1.845 6.034 3.847-1.176 1.845 6.035 3.848-1.177 4.323 14.142h8.392v-22.849h118.672v22.849h8.392l4.323-14.142 3.848 1.177 1.845-6.035 3.847 1.176 1.845-6.034 15.39 4.705-1.845 6.035 3.848 1.176-1.845 6.035 3.847 1.176-7.38 24.139-3.847-1.177-1.412 4.618h28.479v91.397h-29.668v22.849h-29.667v22.849h-32.171v17.639h13.582v22.849h13.583v55.159l-108.66-1.473v-48.507l-4.14-.863.542-2.708-9.277-1.933.831-4.15-7.003-3.975 1.092-1.959-4.902-2.783.947-1.698-1.088-.961-3.669-2.082.433-.776-11.574-10.223 1.473-1.693-4.654-4.111 1.473-1.693-.628-.555-.231 1.394-17.943-3.106.313-1.892-4.486-.776.312-1.892-4.485-.777 1.251-7.568 4.486.777.312-1.892 4.486.776.313-1.892 17.943 3.107-.313 1.892 4.486.776-.312 1.892 4.485.777-.405 2.452 2.434 2.15 1.473-1.693 18.616 16.442-1.473 1.693 3.276 2.894 14.906 8.462-.177.317 4.46.929zm-5.375.712l.352.2.26-1.296-.612 1.096z"
      ></path>
    </svg>
  );
}

export default React.memo(GithubIcon);