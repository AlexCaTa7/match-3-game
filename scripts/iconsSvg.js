const NS = "http://www.w3.org/2000/svg";

export function SunIcon() {
    const sunIcon = document.createElementNS(NS, 'svg');
    const size = 50;
    const centerX = size / 2;
    const centerY = size / 2;
    sunIcon.setAttribute('width', size);
    sunIcon.setAttribute('height', size);
    sunIcon.setAttribute('viewBox', `0 0 ${size} ${size}`);

    // Cercul central al soarelui
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
    const moonIcon = document.createElementNS(NS, 'svg');
    const size = 50;
    const centerX = size / 2;
    const centerY = size / 2;
    moonIcon.setAttribute('width', size);
    moonIcon.setAttribute('height', size);
    moonIcon.setAttribute('viewBox', `0 0 ${size} ${size}`);

    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('r', '10');
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('stroke', 'blue');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('fill', 'silver');
    moonIcon.appendChild(circle);
    return moonIcon;
}
