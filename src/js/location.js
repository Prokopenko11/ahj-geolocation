export default class Location {
  constructor() {
    this.popup = document.querySelector('.popup');
    this.body = document.querySelector('body');
    this.popupInput = document.querySelector('.popup-input');

    this.closeButton = document.querySelector('.popup-button-close');
    this.submitButton = document.querySelector('.popup-button-submit');

    this.onClose = this.onClose.bind(this);
    this.closeButton.addEventListener('click', this.onClose);

    this.onSubmit = this.onSubmit.bind(this);
    this.submitButton.addEventListener('click', this.onSubmit);

    this.popupInputValue = null;
    this.resolveLocation = null;
  }

  onClose() {
    this.popup.classList.remove('active');
    this.body.classList.remove('mask');

    if (this.popupInput.value) {
      this.popupInput.value = '';
    }

    this.clearError();
  }

  onSubmit() {
    if (this.popupInput.value) {
      try {
        const coordinates = this.parseCoordinates(this.popupInput.value);

        this.popupInputValue = coordinates;
        this.onClose();

        if (this.resolveLocation) {
          this.resolveLocation(`[${coordinates.latitude}, ${coordinates.longitude}]`);
          this.resolveLocation = null;
        }

        this.popupInput.value = '';
      } catch (error) {
        this.showError(error.message);
      }
    } else {
      this.showError('Поле ввода не может быть пустым!');
    }
  }

  async getLocation() {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        return `[${latitude.toFixed(5)}, ${longitude.toFixed(5)}]`;
      }
    } catch (error) {
      this.showPopup();

      return new Promise((resolve) => {
        this.resolveLocation = resolve;
      });
    }
  }

  showPopup() {
    this.popup.classList.add('active');
    this.body.classList.add('mask');
  }

  parseCoordinates(input) {
    const cleanedInput = input.replace(/[[\]]/g, '');

    const [lat, lon] = cleanedInput.split(',');

    if (!lat || !lon) {
      throw new Error('Введите широту и долготу через запятую!');
    }

    const latitude = parseFloat(lat.trim());
    const longitude = parseFloat(lon.trim());

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      throw new Error('Введите корректные числовые значения!');
    }

    return { latitude, longitude };
  }

  showError(message) {
    const popupInput = document.querySelector('.popup-input');
    const existingError = document.querySelector('.error');

    if (existingError) {
      existingError.remove();
    }

    const messageElem = document.createElement('p');
    messageElem.className = 'error';
    messageElem.textContent = message;

    popupInput.insertAdjacentElement('afterend', messageElem);
  }

  clearError() {
    const existingError = document.querySelector('.error');
    if (existingError) {
      existingError.remove();
    }
  }
}
