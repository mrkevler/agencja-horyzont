// Professional Cookie Consent Plugin for Agencja Horyzont
class CookieConsent {
    constructor() {
        this.cookieName = 'agencja_horyzont_consent';
        this.consentData = this.getConsentData();
        this.init();
    }

    init() {
        // Check if consent has already been given
        if (!this.consentData) {
            this.showConsentBanner();
        } else {
            this.loadConsentedServices();
        }
    }

    showConsentBanner() {
        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // Add event listeners
        this.addEventListeners(banner);
        
        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    createConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <div class="consent-header">
                    <h3>🍪 Ustawienia prywatności</h3>
                    <p>Szanujemy Twoją prywatność i chcemy być transparentni w kwestii używanych plików cookie.</p>
                </div>
                
                <div class="consent-categories">
                    <div class="consent-category">
                        <div class="category-header">
                            <label class="consent-switch">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Niezbędne pliki cookie</h4>
                                <p>Wymagane do podstawowego funkcjonowania strony</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="consent-category">
                        <div class="category-header">
                            <label class="consent-switch">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Analityczne</h4>
                                <p>Pomagają nam zrozumieć, jak odwiedzający korzystają ze strony</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="consent-category">
                        <div class="category-header">
                            <label class="consent-switch">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="slider"></span>
                            </label>
                            <div class="category-info">
                                <h4>Marketingowe</h4>
                                <p>Używane do wyświetlania spersonalizowanych reklam</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="consent-buttons">
                    <button type="button" class="btn-decline">Odrzuć wszystkie</button>
                    <button type="button" class="btn-accept-selected">Akceptuj wybrane</button>
                    <button type="button" class="btn-accept-all">Akceptuj wszystkie</button>
                </div>
                
                <div class="consent-footer">
                    <p>Więcej informacji w naszej <a href="/polityka-prywatnosci.html" target="_blank">Polityce Prywatności</a></p>
                </div>
            </div>
        `;
        
        return banner;
    }

    addEventListeners(banner) {
        const acceptAllBtn = banner.querySelector('.btn-accept-all');
        const acceptSelectedBtn = banner.querySelector('.btn-accept-selected');
        const declineBtn = banner.querySelector('.btn-decline');

        acceptAllBtn.addEventListener('click', () => {
            this.acceptAll(banner);
        });

        acceptSelectedBtn.addEventListener('click', () => {
            this.acceptSelected(banner);
        });

        declineBtn.addEventListener('click', () => {
            this.declineAll(banner);
        });
    }

    acceptAll(banner) {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.loadConsentedServices();
        this.hideBanner(banner);
    }

    acceptSelected(banner) {
        const consent = {
            necessary: true,
            analytics: banner.querySelector('#analytics-cookies').checked,
            marketing: banner.querySelector('#marketing-cookies').checked,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.loadConsentedServices();
        this.hideBanner(banner);
    }

    declineAll(banner) {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        this.saveConsent(consent);
        this.loadConsentedServices();
        this.hideBanner(banner);
    }

    hideBanner(banner) {
        banner.classList.add('hide');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }

    saveConsent(consent) {
        localStorage.setItem(this.cookieName, JSON.stringify(consent));
        this.consentData = consent;
    }

    getConsentData() {
        const data = localStorage.getItem(this.cookieName);
        return data ? JSON.parse(data) : null;
    }

    loadConsentedServices() {
        if (!this.consentData) return;

        // Load analytics if consented
        if (this.consentData.analytics) {
            this.loadGoogleAnalytics();
        }

        // Load marketing tools if consented
        if (this.consentData.marketing) {
            this.loadMarketingTools();
        }
    }

    loadGoogleAnalytics() {
        // Google Analytics 4 implementation
        if (!window.gtag) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID', {
                anonymize_ip: true,
                cookie_flags: 'secure;samesite=lax'
            });
        }
    }

    loadMarketingTools() {
        // Load Facebook Pixel, Google Ads, etc. if needed
        console.log('Marketing tools would be loaded here');
    }

    // Method to show consent preferences (for settings page)
    showConsentSettings() {
        this.showConsentBanner();
    }

    // Method to reset consent
    resetConsent() {
        localStorage.removeItem(this.cookieName);
        this.consentData = null;
        window.location.reload();
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
});