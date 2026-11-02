
/* 
   ECO GLOW CLEANING SOLUTIONS
   WEDE5020 - Part 3
   JavaScript Functionality
*/

// Wait until the HTML page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------
    // 1. AUTOMATIC COPYRIGHT YEAR
    // ----------------------------------

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ----------------------------------
    // 2. WELCOME GREETING
    // ----------------------------------

    const greeting = document.getElementById("greeting");

    if (greeting) {
        const hour = new Date().getHours();

        if (hour < 12) {
            greeting.textContent = "Good morning! Welcome to Eco Glow.";
        } else if (hour < 18) {
            greeting.textContent = "Good afternoon! Welcome to Eco Glow.";
        } else {
            greeting.textContent = "Good evening! Welcome to Eco Glow.";
        }
    }


    // ----------------------------------
    // 3. SCROLL ANIMATION
    // ----------------------------------

    const revealElements = document.querySelectorAll(
        ".card, .form-card, .info-card, .gallery-item, .stat-box, .faq-item"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        revealElements.forEach(function (element) {
            element.classList.add("show");
        });
    }


    // ----------------------------------
    // 4. FAQ ACCORDION
    // ----------------------------------

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            if (!answer) return;

            const isOpen = answer.classList.contains("active");

            // Close all other answers
            document.querySelectorAll(".faq .answer").forEach(function (item) {
                item.classList.remove("active");
            });

            faqQuestions.forEach(function (item) {
                item.setAttribute("aria-expanded", "false");
            });

            // Open the selected answer
            if (!isOpen) {
                answer.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }

        });

    });


    // ----------------------------------
    // 5. TABS
    // ----------------------------------

    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedTab = button.getAttribute("aria-controls");

            tabButtons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            tabPanels.forEach(function (panel) {
                panel.classList.remove("active");
                panel.hidden = true;
            });

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            const selectedPanel = document.getElementById(selectedTab);

            if (selectedPanel) {
                selectedPanel.classList.add("active");
                selectedPanel.hidden = false;
            }

        });

    });


    // ----------------------------------
    // 6. SERVICE INFORMATION MODAL
    // ----------------------------------

    const serviceModal = document.getElementById("service-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const modalEnquire = document.getElementById("modal-enquire");
    const closeModal = document.querySelector(".close-modal");

    document.querySelectorAll(".open-modal").forEach(function (button) {

        button.addEventListener("click", function () {

            if (!serviceModal) return;

            const serviceName = button.getAttribute("data-service");
            const serviceDescription = button.getAttribute("data-description");

            if (modalTitle) {
                modalTitle.textContent = serviceName || "Eco Glow Service";
            }

            if (modalText) {
                modalText.textContent = serviceDescription ||
                    "Contact Eco Glow Cleaning Solutions for more information.";
            }

            if (modalEnquire) {
                modalEnquire.href =
                    "enquiry.html?service=" +
                    encodeURIComponent(serviceName || "");
            }

            serviceModal.hidden = false;
            serviceModal.setAttribute("aria-hidden", "false");

        });

    });

    if (closeModal && serviceModal) {

        closeModal.addEventListener("click", function () {
            serviceModal.hidden = true;
            serviceModal.setAttribute("aria-hidden", "true");
        });

    }

    if (serviceModal) {

        serviceModal.addEventListener("click", function (event) {

            if (event.target === serviceModal) {
                serviceModal.hidden = true;
                serviceModal.setAttribute("aria-hidden", "true");
            }

        });

    }


   
    // ----------------------------------
    // 7. IMAGE GALLERY LIGHTBOX
    // ----------------------------------

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const previousImage = document.getElementById("lightbox-prev");
    const nextImage = document.getElementById("lightbox-next");

    let currentImage = 0;

    // Display selected gallery image
    function showGalleryImage(index) {

        if (!lightbox || !lightboxImage || galleryItems.length === 0) {
            return;
        }

        currentImage = (index + galleryItems.length) % galleryItems.length;

        const image = galleryItems[currentImage].querySelector("img");

        if (image) {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            if (lightboxCaption) {
                lightboxCaption.textContent =
                    image.alt || "Eco Glow cleaning gallery";
            }

            lightbox.hidden = false;
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    // Open image when gallery item is clicked
    galleryItems.forEach(function (item, index) {

        item.addEventListener("click", function () {
            showGalleryImage(index);
        });

    });

    // Show previous image
    if (previousImage) {
        previousImage.addEventListener("click", function () {
            showGalleryImage(currentImage - 1);
        });
    }

    // Show next image
    if (nextImage) {
        nextImage.addEventListener("click", function () {
            showGalleryImage(currentImage + 1);
        });
    }

    // Close lightbox
    function closeLightbox() {

        if (lightbox) {
            lightbox.hidden = true;
            lightbox.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }

    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });
    }

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeLightbox();

            if (serviceModal && !serviceModal.hidden) {
                serviceModal.hidden = true;
                serviceModal.setAttribute("aria-hidden", "true");
            }
        }

    });

    // ----------------------------------
    // 8. PRODUCT SEARCH, FILTER AND SORT
    // ----------------------------------

    const productList = document.getElementById("product-list");
    const productSearch = document.getElementById("product-search");
    const productCategory = document.getElementById("product-category");
    const productSort = document.getElementById("product-sort");
    const resultCount = document.getElementById("result-count");

    let products = [];

    function displayProducts() {

        if (!productList) return;

        const searchText = productSearch ?
            productSearch.value.toLowerCase() : "";

        const category = productCategory ?
            productCategory.value : "all";

        let filteredProducts = products.filter(function (product) {

            const matchesSearch =
                product.name.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText);

            const matchesCategory =
                category === "all" || product.category === category;

            return matchesSearch && matchesCategory;

        });

        if (productSort && productSort.value === "low-high") {
            filteredProducts.sort(function (a, b) {
                return Number(a.price) - Number(b.price);
            });
        }

        if (productSort && productSort.value === "high-low") {
            filteredProducts.sort(function (a, b) {
                return Number(b.price) - Number(a.price);
            });
        }

        productList.replaceChildren();

        if (filteredProducts.length === 0) {

            const message = document.createElement("p");
            message.textContent = "No products found. Please try another search.";
            productList.appendChild(message);

        } else {

            filteredProducts.forEach(function (product) {

                const card = document.createElement("article");
                card.className = "product-card";

                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.name;
                image.loading = "lazy";

                const name = document.createElement("h3");
                name.textContent = product.name;

                const description = document.createElement("p");
                description.textContent = product.description;

                const price = document.createElement("p");
                price.textContent = "Price: R" + product.price;

                const link = document.createElement("a");
                link.textContent = "Enquire about product";
                link.href = "enquiry.html?product=" +
                    encodeURIComponent(product.name);

                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(description);
                card.appendChild(price);
                card.appendChild(link);

                productList.appendChild(card);

            });

        }

        if (resultCount) {
            resultCount.textContent =
                filteredProducts.length + " product(s) found";
        }

    }

    
async function loadProducts() {

    if (!productList) return;

    try {

        const response = await fetch("../data/products.json");

        if (!response.ok) {
            throw new Error("Could not find products.json");
        }

        const loadedProducts = await response.json();

        console.log("Loaded product data:", loadedProducts);

        if (!Array.isArray(loadedProducts)) {
            throw new Error("The products file must contain a JSON array.");
        }

        products = loadedProducts;

        console.log("Total products:", products.length);

        displayProducts();

    } catch (error) {

        console.error("Product loading error:", error);

        productList.textContent =
            "Unable to load products. Please check the products file.";

    }

}


    if (productList) {

        loadProducts();

        if (productSearch) {
            productSearch.addEventListener("input", displayProducts);
        }

        if (productCategory) {
            productCategory.addEventListener("change", displayProducts);
        }

        if (productSort) {
            productSort.addEventListener("change", displayProducts);
        }

    }


    // ----------------------------------
    // 9. ENQUIRY FORM
    // ----------------------------------

    const enquiryForm = document.getElementById("enquiry-form");
    const enquiryResponse = document.getElementById("enquiry-response");

    if (enquiryForm) {

        const serviceField = enquiryForm.querySelector('[name="service"]');
        const productField = enquiryForm.querySelector('[name="product"]');

        // Read service or product from the URL
        const parameters = new URLSearchParams(window.location.search);

        if (serviceField && parameters.has("service")) {
            serviceField.value = parameters.get("service");
        }

        if (productField && parameters.has("product")) {
            productField.value = parameters.get("product");
        }

        enquiryForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            if (enquiryResponse) {
                enquiryResponse.textContent = "Your enquiry is being processed...";
            }

            const formData = new FormData(enquiryForm);
            const formAction = enquiryForm.getAttribute("action");

            try {

                // Demo mode: no information is sent to a server
                if (!formAction || formAction.includes("YOUR_FORM_ID")) {

                    await new Promise(function (resolve) {
                        setTimeout(resolve, 800);
                    });

                    if (enquiryResponse) {
                        enquiryResponse.textContent =
                            "Thank you for contacting Eco Glow Cleaning Solutions. " +
                            "Your form passed validation. This is a demonstration; " +
                            "your enquiry has not been sent. Please contact us directly.";
                    }

                } else {

                    const response = await fetch(formAction, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    });

                    if (!response.ok) {
                        throw new Error("The enquiry could not be submitted.");
                    }

                    if (enquiryResponse) {
                        enquiryResponse.textContent =
                            "Thank you! Your enquiry has been submitted successfully.";
                    }

                    enquiryForm.reset();

                }

            } catch (error) {

                if (enquiryResponse) {
                    enquiryResponse.textContent =
                        "Sorry, your enquiry could not be sent. Please try again later.";
                }

                console.error(error);

            }

        });

    }


    // ----------------------------------
    // 10. CONTACT FORM VALIDATION
    // ----------------------------------

    const contactForm = document.getElementById("contact-form");
    const contactResponse = document.getElementById("contact-response");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = contactForm.elements.namedItem("name").value.trim();
            const surname = contactForm.elements.namedItem("surname").value.trim();
            const email = contactForm.elements.namedItem("email").value.trim();
            const type = contactForm.elements.namedItem("type").value;
            const message = contactForm.elements.namedItem("message").value.trim();

            if (!name || !surname || !email || !type || !message) {

                if (contactResponse) {
                    contactResponse.textContent =
                        "Please complete all required fields.";
                }

                return;
            }

            const recipient = "info@ecoglowcleaning.co.za";

            const subject = encodeURIComponent(
                "Eco Glow Contact Form - " + type
            );

            const body = encodeURIComponent(
                "Name: " + name + " " + surname +
                "\nEmail: " + email +
                "\nMessage type: " + type +
                "\n\nMessage:\n" + message
            );

            if (contactResponse) {
                contactResponse.textContent =
                    "Your message is ready. Your email application will open so you can send it.";
            }

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + subject +
                "&body=" + body;

        });

    }


});


const recipient = "info@ecoglowcleaning.co.za";

const subject = encodeURIComponent(
    "Eco Glow Contact Form - " + type
);

const body = encodeURIComponent(
    "Name: " + name + " " + surname +
    "\nEmail: " + email +
    "\nMessage type: " + type +
    "\n\nMessage:\n" + message
);

if (contactResponse) {
    contactResponse.textContent =
        "Your message is ready. Your email application will open so you can send it.";
}

window.location.href =
    "mailto:" + recipient +
    "?subject=" + subject +
    "&body=" + body;





