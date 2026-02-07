/**
 * PRICING ENGINE (Source: Store brochure_020626.pdf)
 * 
 * Strict Pricing Enforcement:
 * - Emailed File Printing: $2.00 minimum.
 * - B&W Printing (8.5x11): $0.25 per side.
 * - Color Printing (8.5x11): $0.68 per side.
 * - Shredding: $15.00 per box (1-15 boxes), drops to $12.00 at 31+ boxes.
 */

const PricingEngine = {
    print: {
        minimumOrder: 2.00,
        bw: {
            letter: 0.25 // per side
        },
        color: {
            letter: 0.68 // per side
        }
    },
    shredding: {
        standardRate: 15.00,
        bulkRate: 12.00,
        bulkThreshold: 31,

        calculate: function (boxes) {
            const count = parseInt(boxes) || 0;
            if (count === 0) return 0;

            // Bulk rate applies ONLY at 31+ boxes
            const rate = count >= this.bulkThreshold ? this.bulkRate : this.standardRate;
            return count * rate;
        }
    }
};

// Export for usage if using modules, or global scope for vanilla JS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PricingEngine;
} else {
    window.PricingEngine = PricingEngine;
}
