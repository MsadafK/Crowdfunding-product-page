document.addEventListener("DOMContentLoaded", (event) => {
  // Selecting DOM elements
  const hamburger_icon = document.querySelector(
    ".header__icons-and-navbar-container__logo-and-hamburgur-icons-container__hamburger-icon"
  );

  const close_icon = document.querySelector(
    ".header__icons-and-navbar-container__logo-and-hamburgur-icons-container__close-icon"
  );

  const navbar = document.querySelector(
    ".header__icons-and-navbar-container__navbar"
  );

  const overlay = document.querySelector(".overlay");

  const back_this_project_btn = document.querySelector(
    ".header__hero__buttons__back-this-project-button"
  );

  const back_this_project = document.querySelector(
    ".back-this-project-container"
  );

  const model_close_btn = document.querySelector(
    ".back-this-project-container__about-this-project__title-and-description__close-icon"
  );

  const all_cards = document.querySelectorAll(".common-class-for-card");

  const all_cards_left_amount = document.querySelectorAll(
    ".card__left__amount"
  );

  const card__buttons = document.querySelectorAll(".card__button");

  const radioButtons = document.querySelectorAll('input[name="reward_level"]');

  const pledgeContainer = document.querySelectorAll(".pledge-container");

  const pledgeContainers = document.querySelectorAll(".pledge-container");
  const continue_button = document.querySelectorAll(".continue-button");

  const thankyou_card = document.querySelector(
    ".main__thanks-for-your-support-card"
  );

  const thankyouCardBtn = document.querySelector(
    ".main__thanks-for-your-support-card__button"
  );

  const total_backed_amount = document.querySelector(
    ".main__stats__total-backed__amount"
  );

  const total_backers = document.querySelector(
    ".main__stats__total-backers__total-backers-number"
  );

  const stats_fillup_bar = document.querySelector(
    ".main__stats__fillup-bar__actual-bar"
  );

  const card_left_amount_of_all_cards = document.querySelectorAll(
    ".card__left__amount"
  );

  const about_this_project_cards_container = document.querySelector(
    ".main__about-this-project__cards-container"
  );

  const bookmark_btn = document.querySelector(
    ".header__hero__buttons__bookmark-button"
  );

  // -------------------------------------------------------------------------------

  hamburger_icon.addEventListener("click", toggleNavbar);

  close_icon.addEventListener("click", toggleNavbar);

  overlay.addEventListener("click", handleClick);

  back_this_project_btn.addEventListener("click", openBackThisProjectWindow);

  bookmark_btn.addEventListener("click", () => {
    bookmark_btn.classList.toggle("active");
    if (bookmark_btn.classList.contains("active") && window.innerWidth < 768) {
      bookmark_btn.querySelector("img").style.content =
        "url(./images/icon-bookmarked.svg)";
    }
    if (!bookmark_btn.classList.contains("active") && window.innerWidth < 768) {
      bookmark_btn.querySelector("img").style.content =
        "url(./images/icon-bookmark.svg)";
    }
    if (bookmark_btn.classList.contains("active") && window.innerWidth >= 768) {
      bookmark_btn.querySelector("span").textContent = "Bookmarked";
      bookmark_btn.querySelector("span").style.color = "hsl(176, 72%, 28%)";
      bookmark_btn.querySelector("img").style.content =
        "url(./images/icon-bookmarked.svg)";
    }
    if (
      !bookmark_btn.classList.contains("active") &&
      window.innerWidth >= 768
    ) {
      bookmark_btn.querySelector("span").textContent = "Bookmark";
      bookmark_btn.querySelector("span").style.color = "hsl(0, 0%, 70%)";
      bookmark_btn.querySelector("img").style.content =
        "url(./images/icon-bookmark.svg)";
    }
  });

  card__buttons.forEach((card__button) => {
    card__button.addEventListener("click", backThisProjectWindow);
  });

  model_close_btn.addEventListener("click", closeBackThisProjectWindow);

  function toggleNavbar() {
    hamburger_icon.classList.toggle("active");
    close_icon.classList.toggle("active");
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  function handleClick(event) {
    event.preventDefault();
    if (navbar.classList.contains("active")) toggleNavbar();
    else if (back_this_project.classList.contains("active")) {
      closeBackThisProjectWindow();
    } else return;
  }

  function openBackThisProjectWindow() {
    overlay.classList.toggle("active");
    back_this_project.classList.toggle("active");
    radioButtons.forEach((radioBtn) => {
      if (radioBtn.checked) {
        radioBtn.checked = false;
        radioBtn.dispatchEvent(new Event("change"));
        radioBtn
          .closest("div")
          .querySelector(".pledge-container").style.display = "none";
        radioBtn.closest("div").style.borderColor = "hsl(0, 0%, 90%)";
      }
      // else radioBtn.closest("div").style.borderColor = "hsl(0, 0%, 90%)";
    });
  }

  function backThisProjectWindow(event) {
    const clickedButton = event.target;
    const cardTitle = clickedButton
      .closest(".common-class-for-card")
      .querySelector(".card__title-and-description__title")
      .textContent.trim();

    overlay.classList.toggle("active");
    back_this_project.classList.toggle("active");

    if (back_this_project.classList.contains("active")) {
      const modalCards = back_this_project.querySelectorAll(
        ".common-class-for-card"
      );

      modalCards.forEach((modalCard) => {
        const modalCardTitle = modalCard.querySelector(
          ".card__title-and-description__title"
        );
        if (modalCardTitle && modalCardTitle.textContent.trim() === cardTitle) {
          const inputToSelect = modalCard.querySelector("input[type='radio']");
          if (inputToSelect) {
            inputToSelect.checked = true;
            inputToSelect.dispatchEvent(new Event("change"));
          }
        }
      });
    }
  }

  function closeBackThisProjectWindow() {
    overlay.classList.toggle("active");
    back_this_project.classList.toggle("active");
  }

  // this code will check the checked property of radio input inside pledge container in order to select or deselect the cards as
  // as pledge container inside of that particular card.
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      // removing existing stylings if any
      radioButtons.forEach((otherButton) => {
        otherButton.closest("div").style.borderColor = "hsl(0, 0%, 90%)";
      });

      pledgeContainer.forEach((container) => {
        container.style.display = "none";
      });

      // adding styles to the selected radio button's parent container
      radioButton.closest("div").style.borderColor = "hsl(176, 50%, 47%)";

      const selectedPledgeContainer = radioButton
        .closest("div")
        .querySelector(".pledge-container");
      const remaining_cards = radioButton
        .closest("div")
        .querySelector(".card__left__amount")
        ?.textContent.trim();

      selectedPledgeContainer.style.display =
        remaining_cards > 0
          ? "grid"
          : remaining_cards === undefined
          ? "grid"
          : "none";

      if (selectedPledgeContainer) {
        selectedPledgeContainer.querySelector(".pledge-amount").value = "";
        selectedPledgeContainer.querySelector(
          ".continue-button"
        ).disabled = true;
        selectedPledgeContainer.querySelector(
          ".continue-button"
        ).style.backgroundColor = "hsl(0, 0%, 90%)";
        selectedPledgeContainer.querySelector(".continue-button").style.cursor =
          "not-allowed";
      }
    });
  });

  // this code will check "left-card-value" of cards in order to enable or disable whole card
  function checkingCardsForStock() {
    all_cards.forEach((item) => {
      const card_left = item.querySelector(".card__left__amount");
      const card_button = item.querySelector(".card__button");
      const input = item.querySelector("input");
      // const pledge_container = input.querySelector(".pledge-container");
      const pledge_container = input
        ? input.querySelector(".pledge-container")
        : null;

      if (Number(card_left.textContent) === 0) {
        input && (input.disabled = true);
        card_button && (card_button.textContent = "Out of stock");
        card_button && card_button.classList.add("disabled-button");
        card_button && (card_button.disabled = true);
        // pledge_container && (pledge_container.style.display = "none");
        item.classList.add("disabled");
      }
    });
  }

  // this code will check the input value inside pledge container in order to enable or disable continue button
  pledgeContainers.forEach((container) => {
    const input = container.querySelector(".pledge-amount");
    const continueButton = container.querySelector(".continue-button");

    if (input && continueButton) {
      // Make sure both elements exist
      input.addEventListener("input", (e) => {
        const amountValue = Number(e.target.value);
        const minValue = Number(input.getAttribute("min"));

        if (amountValue && amountValue >= minValue) {
          continueButton.disabled = false;
          continueButton.style.backgroundColor = "hsl(176, 50%, 47%)";
          continueButton.style.cursor = "pointer";
          continueButton.addEventListener("mouseover", () => {
            if (!continueButton.disabled)
              continueButton.style.backgroundColor = "hsl(176, 72%, 28%)";
          });
          continueButton.addEventListener("mouseout", () => {
            if (!continueButton.disabled)
              continueButton.style.backgroundColor = "hsl(176, 50%, 47%)";
          });
        } else {
          continueButton.disabled = true;
          continueButton.style.backgroundColor = "hsl(0, 0%, 90%)";
          continueButton.style.cursor = "not-allowed";
        }
      });
    }
  });

  // this code will take care of all the things that will happen when the continue button gets clicked.
  continue_button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pledge_amount = btn
        .closest(".pledge-container")
        .querySelector(".pledge-amount");

      const card_left = Array.from(card_left_amount_of_all_cards).filter(
        (card) => {
          if (
            btn
              .closest("div")
              .closest(".common-class-for-card")
              ?.querySelector(".card__title-and-description__title")
              .textContent.trim() ===
            card
              .closest("div")
              .closest(".card")
              .querySelector(".card__title-and-description__title")
              .textContent.trim()
          ) {
            return card;
          }
        }
      );

      const amountValue = Number(
        total_backed_amount.textContent.trim().replace(/\D/g, "")
      );

      if (pledge_amount && card_left) {
        card_left.forEach((card) => {
          card.textContent = Number(card.textContent) - 1;
        });

        total_backed_amount.textContent =
          "$" + (amountValue + Number(pledge_amount.value));
        total_backers.textContent =
          Number(total_backers.textContent.trim().replace(/\D/g, "")) + 1;
        back_this_project.classList.toggle("active");
        thankyou_card.classList.toggle("active");
        stats_fillup_bar.style.width = `${
          ((amountValue + Number(pledge_amount.value)) / 100000) * 100
        }%`;
        return;
      }
      if (pledge_amount && !card_left) {
        total_backed_amount.textContent =
          "$" + (amountValue + Number(pledge_amount.value));
        total_backers.textContent =
          Number(total_backers.textContent.trim().replace(/\D/g, "")) + 1;
        back_this_project.classList.toggle("active");
        thankyou_card.classList.toggle("active");
        stats_fillup_bar.style.width = `${
          ((amountValue + Number(pledge_amount.value)) / 100000) * 100
        }%`;
      }
    });
  });

  // this code will take care of those few things that ll happen when the thankyou card button gets clicked.
  thankyouCardBtn.addEventListener("click", () => {
    checkingCardsForStock();
    thankyou_card.classList.toggle("active");
    overlay.classList.toggle("active");

    const amountValue = Number(
      total_backed_amount.textContent.trim().replace(/\D/g, "")
    );

    if (amountValue >= 100000) {
      about_this_project_cards_container.style.display = "none";
      back_this_project_btn.disabled = true;
      back_this_project_btn.style.backgroundColor = "hsl(0, 0%, 90%)";
      back_this_project_btn.style.cursor = "not-allowed";
    }
  });
});
