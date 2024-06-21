import './favorites.scss';
import image from '../assets/duck-product.jpg';
import { Carousel, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Favorites = () => {
    const [items, setItems] = useState([
        { id: 1, title: 'Item 1 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 },
        { id: 2, title: 'Item 2 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 3 },
        { id: 3, title: 'Item 3 Title', description: 'Item 3 description text goes here.', price: '$19.99', rating: 2 },
        { id: 4, title: 'Item 4 Title', description: 'Item 4 description text goes here.', price: '$14.99', rating: 1 },
        { id: 5, title: 'Item 5 Title', description: 'Item 5 description text goes here.', price: '$39.99', rating: 5 },
        { id: 6, title: 'Item 6 Title', description: 'Item 6 description text goes here.', price: '$49.99', rating: 4 },
        { id: 7, title: 'Item 7 Title', description: 'Item 7 description text goes here.', price: '$59.99', rating: 3 },
        { id: 8, title: 'Item 8 Title', description: 'Item 8 description text goes here.', price: '$69.99', rating: 2 }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); // State to track current carousel page

    useEffect(() => {
        // Ensure activeIndex stays within bounds if items are deleted
        if (activeIndex >= Math.ceil(items.length / 4)) {
            setActiveIndex(Math.max(0, Math.ceil(items.length / 4) - 1));
        }
    }, [items, activeIndex]);

    const handleDelete = (id) => {
        const item = items.find(item => item.id === id);
        setItemToDelete(item);
        setShowModal(true);
    };

    const confirmDelete = () => {
        const updatedItems = items.filter(item => item.id !== itemToDelete.id);
        setItems(updatedItems);
        setShowModal(false);
        setItemToDelete(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setItemToDelete(null);
    };

    const renderSlide = (startIndex, endIndex) => {
        return (
            <Carousel.Item key={startIndex}>
                <div className="d-flex flex-wrap">
                    {items.slice(startIndex, endIndex).map(item => (
                        <div className="card" key={item.id}>
                            <Button variant="danger" className="delete-button" onClick={() => handleDelete(item.id)}>X</Button>
                            <img src={image} className="card-img-top" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <div className="rating">
                                    {Array.from({ length: item.rating }, (_, index) => (
                                        <span key={index} className="star fa fa-star text-warning">&#9733;</span>
                                    ))}
                                    {Array.from({ length: 5 - item.rating }, (_, index) => (
                                        <span key={index + item.rating} className="fa fa-star-o">&#9734;</span>
                                    ))}
                                </div>
                                <p className="card-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Carousel.Item>
        );
    };

    const renderSlides = () => {
        const slides = [];
        let startIndex = 0;
        while (startIndex < items.length) {
            const endIndex = startIndex + 4;
            slides.push(renderSlide(startIndex, endIndex));
            startIndex = endIndex;
        }
        return slides;
    };

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    };

    const renderContent = () => {
        if (items.length > 0) {
            const showIndicators = items.length > 4; // Determine whether to show indicators based on number of items
            const showControls = items.length > 4; // Determine whether to show controls based on number of items

            return (
                <Carousel
                    indicators={showIndicators}
                    controls={showControls}
                    activeIndex={activeIndex}
                    onSelect={handleSelect}
                >
                    {renderSlides()}
                </Carousel>
            );
        } else {
            return (
                <div className="empty-message mx-auto">
                    <strong>Empty</strong>
                </div>
            );
        }
    };

    return (
        <div className="favorites-container">
            <div className="favorites-tab bg-secondary text-white">Favorites</div>
            <div className="cards-wrapper bg-light-grey">
                {renderContent()}
            </div>
            <div className="add-list-button">
                <button className="btn btn-primary rounded-pill">Add List +</button>
            </div>
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete &quot;{itemToDelete?.title}&quot;?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeModal}>
                        No
                    </Button>
                    <Button variant="success" onClick={confirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Favorites;
