const NS = "http://www.w3.org/2000/svg";

export function SunIcon() {
    const sunIcon = document.createElementNS(NS, 'svg');
    const size = 50;
    const centerX = size / 2;
    const centerY = size / 2;
    sunIcon.setAttribute('width', size);
    sunIcon.setAttribute('height', size);
    sunIcon.setAttribute('viewBox', `0 0 ${size} ${size}`);

    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '10');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('stroke', 'gold');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'gold');
    sunIcon.appendChild(circle);

    const rayNum = 10;

    function createRay() {
        const poly = document.createElementNS(NS, 'polygon');
        poly.setAttribute('points', '22,13 25,10 28,13');
        poly.setAttribute('fill', 'gold');
        return poly;
    }

    for (let i = 0; i < rayNum; i++) {
        const angle = i * (360 / rayNum);
        const ray = createRay();
        ray.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
        sunIcon.appendChild(ray);
    }

    return sunIcon;
}
export function MoonIcon() {
    const NS = "http://www.w3.org/2000/svg";
    const moonIcon = document.createElementNS(NS, 'svg');
    const size = 50;
    const centerX = size / 2;
    const centerY = size / 2;
    moonIcon.setAttribute('width', size);
    moonIcon.setAttribute('height', size);
    moonIcon.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // Full moon circle
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '10');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('stroke', 'silver');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'silver');

    // Crescent cutout (smaller circle offset to the right)
    const crescent = document.createElementNS(NS, 'circle');
    crescent.setAttribute('r', '10');
    crescent.setAttribute('cx', centerX + 4);
    crescent.setAttribute('cy', centerY);
    crescent.setAttribute('fill', 'darkblue');

    moonIcon.appendChild(circle);
    moonIcon.appendChild(crescent);

    return moonIcon;
}
export function RestartButton() {
    const NS = "http://www.w3.org/2000/svg";

    // Create button
    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Restart');
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.padding = '0';
    button.id = 'BokuANamaoEErenYeger';
    button.style.borderRadius = '50%';
    button.style.background = 'transparent';
    button.style.cursor = 'pointer';
    button.style.transition = 'transform 0.2s ease, border-color 0.2s';

    // Optional hover effect (scale + highlight border)
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.borderColor = 'white';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.borderColor = 'silver';
    });

    // Create SVG
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '50');
    svg.setAttribute('height', '50');
    svg.setAttribute('viewBox', '0 0 50 50');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path1 = document.createElementNS(NS, 'path');
    path1.setAttribute('d', 'M45 10v12h-12');

    const path2 = document.createElementNS(NS, 'path');
    path2.setAttribute('d', 'M42 35a18 18 0 1 1 2.5-20');

    svg.appendChild(path1);
    svg.appendChild(path2);
    button.appendChild(svg);

    return button;
}
