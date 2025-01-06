<script setup>

 // Tableau avec les données pour chaque itération
    const howToUseData = [
        {   
            iconClass: 'bi-clipboard-data',
            textContent: `
                <div>
                    <h3 class='blue-text'>SEO Performance Analysis</h3>
                    <p>Evaluate your article’s SEO score with Otis! Get actionable recommendations like increasing word count, adding sections, incorporating more keywords, or optimizing structure to boost your rankings.</p>
                </div>
            `,
            iconColor: "#6a11cb",
        },
        {   
            iconClass: 'bi-database-gear',
            textContent: `
                <div>
                    <h3 class='blue-text'>Custom API Access</h3>
                    <p>For advanced users, Otis will offer a user-friendly API to retrieve article data in JSON format. Perfect for integrating seamlessly with custom-built websites or automating your content workflow.</p>
                </div>
            `,
            iconColor: "#6a11cb",
        },
        {   
            iconClass: 'bi-input-cursor-text',
            textContent: `
                <div>
                    <h3 class='blue-text'>Smart Text Editor with Auto-Completion</h3>
                    <p>Edit your articles directly on Otis! Our upcoming text editor will:</p>
                    <ul>
                        <li>Generate content for titles or sections on the fly.</li>
                        <li>Analyze and suggest improvements for highlighted text blocks.</li>
                        <li>Offer auto-completion tailored to your style and SEO goals.</li>
                        <li>Let you customize HTML elements with CSS classes for full design control.</li> 
                    </ul>
                </div>
            `,
            iconColor: "#6a11cb",
        },
        {   
            iconClass: 'bi-rocket-takeoff',
            textContent: `
                <div>
                    <h3 class='blue-text'>One-Click Publishing via Webhooks</h3>
                    <p>Simplify publishing! Soon, you’ll be able to send articles directly from Otis to your website with just one click. For WordPress users, we’re exploring ways to tailor content for different page builders and editors.</p>
                </div>
            `,
            iconColor: "#6a11cb",
        },
    ];

</script>

<template>

    <div class="mt-5">

        <h2>Otis AI is Still in Development</h2>

        <div>
            <p>
                This is just the beginning! Currently, Otis AI helps you generate SEO-friendly articles based on a prompt and keywords. But we’re working on exciting new features to take your content game to the next level. Here’s what’s coming soon:
            </p>
        </div>

        <div class="mb-2 mt-2 d-flex flex-column flex-wrap">
            <generic-icon-txt-h v-for="(item, index) in howToUseData"
                :key="index"
                :iconClass="item.iconClass"
                :textContent="item.textContent"
                :iconColor="item.iconColor"
                :textColor="item.textColor"
            ></generic-icon-txt-h>
        </div>

        <div>
            <p>
                Otis AI is evolving to give you even more tools to create, edit, and publish top-notch content effortlessly. Stay tuned—big things are coming!
            </p>
        </div>

    </div>

</template>