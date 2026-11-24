
const DEFAULT_PROFILE = {
    name: "Allen Gabriel",

    role: "A Computer Science student who loves learning and creating.",

    intro: "I'm someone who enjoys exploring new ideas, solving problems, and improving a little every day. This is a small space where you can get to know me.",

    about: "I'm a student who is curious about how things work and enjoys turning ideas into something useful. I value learning, patience, and personal growth. I may not know everything yet, but I'm always willing to try, ask questions, and improve.",

    personality: "Thoughtful, curious, determined, and detail-oriented — still learning, still growing.",

    education: "BS Computer Science",

    location: "Philippines",

    focus: "Technology & learning",

    motto: "Progress, not perfection.",

    interests: [
        {
            title: "Programming",
            description: "Building projects and learning how technology works.",
            icon: "bi-code-slash"
        },
        {
            title: "Learning",
            description: "Exploring new topics and developing useful skills.",
            icon: "bi-book"
        },
        {
            title: "Creativity",
            description: "Finding ideas and turning them into something meaningful.",
            icon: "bi-camera"
        }
    ],

    goals: "My goal is to keep improving my skills, create projects that can help people, and become someone who is confident in what I can do. I believe every small step is part of a bigger journey.",

    facebook: "",
    instagram: "",
    github: "",

    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85"
};


// LOAD PROFILE FROM LOCAL STORAGE

let profile = loadProfile();

function loadProfile() {

    try {

        const saved = localStorage.getItem("aboutMeProfile");

        return saved
            ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
            : { ...DEFAULT_PROFILE };

    } catch (error) {

        console.warn("Could not load saved profile:", error);

        return { ...DEFAULT_PROFILE };
    }
}


// UPDATE TEXT CONTENT

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value || "";
    }
}


// DISPLAY PROFILE

function renderProfile() {

    setText("heroName", profile.name);
    setText("heroRole", profile.role);
    setText("heroIntro", profile.intro);

    setText("aboutText", profile.about);
    setText("personalityText", profile.personality);

    setText("education", profile.education);
    setText("location", profile.location);
    setText("focus", profile.focus);
    setText("motto", profile.motto);

    setText("goalsText", profile.goals);
    setText("footerName", profile.name);

    document.getElementById("profileImage").src =
        profile.photo || DEFAULT_PROFILE.photo;

    document.getElementById("photoPreview").src =
        profile.photo || DEFAULT_PROFILE.photo;

    renderInterests();

    setSocialLink("facebookLink", profile.facebook);
    setSocialLink("instagramLink", profile.instagram);
    setSocialLink("githubLink", profile.github);
}


// SOCIAL MEDIA LINKS

function setSocialLink(id, url) {

    const link = document.getElementById(id);

    link.href = url || "#";

    link.style.display = url ? "inline-block" : "none";
}


// DISPLAY INTERESTS

function renderInterests() {

    const container = document.getElementById("interestList");

    container.replaceChildren();

    (profile.interests || []).forEach((interest) => {

        const col = document.createElement("div");
        col.className = "col-sm-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "interest-card";

        const iconWrap = document.createElement("div");
        iconWrap.className = "interest-icon";

        const icon = document.createElement("i");
        icon.className = `bi ${safeIcon(interest.icon)}`;

        iconWrap.appendChild(icon);

        const title = document.createElement("h3");
        title.textContent = interest.title;

        const description = document.createElement("p");
        description.textContent = interest.description;

        card.append(iconWrap, title, description);

        col.appendChild(card);

        container.appendChild(col);
    });
}


// VALIDATE ICON CLASS

function safeIcon(icon) {

    return /^bi-[a-z0-9-]+$/.test(icon || "")
        ? icon
        : "bi-stars";
}


// FILL EDIT PROFILE FORM

function fillEditor() {

    const fields = {

        nameInput: "name",
        roleInput: "role",
        introInput: "intro",
        aboutInput: "about",
        personalityInput: "personality",

        educationInput: "education",
        locationInput: "location",
        focusInput: "focus",
        mottoInput: "motto",

        goalsInput: "goals",

        facebookInput: "facebook",
        instagramInput: "instagram",
        githubInput: "github"
    };

    Object.entries(fields).forEach(([inputId, key]) => {

        document.getElementById(inputId).value =
            profile[key] || "";

    });

    document.getElementById("interestsInput").value =
        (profile.interests || [])
            .map(item => item.title)
            .join(", ");
}


// OPEN EDIT MODAL

document.getElementById("editModal")
    .addEventListener("show.bs.modal", fillEditor);


// PROFILE PHOTO UPLOAD

document.getElementById("photoInput")
    .addEventListener("change", (event) => {

        const file = event.target.files &&
            event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            alert("Please choose an image file.");

            event.target.value = "";

            return;
        }

        if (file.size > 2 * 1024 * 1024) {

            alert("Please choose an image smaller than 2 MB.");

            event.target.value = "";

            return;
        }

        const reader = new FileReader();

        reader.onload = () => {

            profile.photo = reader.result;

            document.getElementById("photoPreview").src =
                reader.result;
        };

        reader.readAsDataURL(file);
    });


// SAVE PROFILE

document.getElementById("profileForm")
    .addEventListener("submit", (event) => {

        event.preventDefault();

        const value = (id) => {

            return document.getElementById(id).value.trim();

        };

        const interestNames = value("interestsInput")
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
            .slice(0, 9);

        const previousInterests = profile.interests || [];

        profile = {

            ...profile,

            name: value("nameInput") || "Your Name",

            role: value("roleInput"),

            intro: value("introInput"),

            about: value("aboutInput"),

            personality: value("personalityInput"),

            education: value("educationInput"),

            location: value("locationInput"),

            focus: value("focusInput"),

            motto: value("mottoInput"),

            goals: value("goalsInput"),

            facebook: value("facebookInput"),

            instagram: value("instagramInput"),

            github: value("githubInput"),

            interests: interestNames.map((title, index) => {

                const old = previousInterests.find(
                    item => item.title.toLowerCase() === title.toLowerCase()
                );

                return old || {

                    title,

                    description: "Add a short description of why you enjoy this.",

                    icon: [
                        "bi-stars",
                        "bi-heart",
                        "bi-lightning-charge"
                    ][index % 3]
                };
            })
        };


        // SAVE TO LOCAL STORAGE

        try {

            localStorage.setItem(
                "aboutMeProfile",
                JSON.stringify(profile)
            );

            renderProfile();

            bootstrap.Modal
                .getOrCreateInstance(
                    document.getElementById("editModal")
                )
                .hide();

        } catch (error) {

            alert(
                "Your profile could not be saved. Try using a smaller profile photo."
            );

            console.error(error);
        }

    });


// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// INITIALIZE WEBSITE

renderProfile();
