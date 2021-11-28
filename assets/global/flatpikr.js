import 'flatpickr/dist/flatpickr.css';
import flatpickr from "flatpickr";
import French from "flatpickr/dist/l10n/fr";

flatpickr(".flatpikr-taken-at", {
    altInput: true,
    altFormat: "F j, Y H:i:S",
    enableTime: true,
    dateFormat: "Y-m-d H:i:S",
    time_24hr: true,
    enableSeconds: true,
    locale: French,
    minuteIncrement: 1
});