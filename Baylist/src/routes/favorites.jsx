import { useState, useEffect } from 'react';
import './favorites.scss';
import image from '../assets/duck-product.jpg';
import { Carousel, Button, Modal, Form, Dropdown } from 'react-bootstrap';

const Favorites = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lists, setLists] = useState([
        {
            id: 1,
            title: 'Favorites',
            items: [
                { id: 1, title: 'Item 1 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 1 },
                { id: 2, title: 'Item 2 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 3 },
                { id: 3, title: 'Item 3 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 },
                { id: 4, title: 'Item 4 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 5 },
                { id: 5, title: 'Item 5 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 0 },
                { id: 6, title: 'Item 6 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 1 },
                { id: 7, title: 'Item 7 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 2 },
                { id: 8, title: 'Item 8 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 3 },
                { id: 9, title: 'Item 9 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 },
                // Other items
            ]
        },
        {
            id: 2,
            title: 'lmao dank memes',
            items: [
                { id: 1, title: 'Duck', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 }
                // Other items
            ]
        }
    ]);
    const [showAddListModal, setShowAddListModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState(null);
    const maxLists = 5;

    useEffect(() => {
        if (lists.length > 0 && !selectedList) {
            setSelectedList(lists[0]);
        }
    }, [lists, selectedList]);

    const handleDelete = (id) => {
        const item = selectedList.items.find(item => item.id === id);
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        const updatedItems = selectedList.items.filter(item => item.id !== itemToDelete.id);
        setSelectedList({ ...selectedList, items: updatedItems });
        setShowDeleteModal(false);
        setItemToDelete(null);

        // Calculate total number of pages after deletion
        const totalPages = Math.ceil(updatedItems.length / 4);

        // Set activeIndex to the last page if it exceeds the total pages
        setActiveIndex(Math.max(0, totalPages - 1));
    };

    const closeModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleAddListClick = () => {
        setShowAddListModal(true);
    };

    const handleCloseModal = () => {
        setShowAddListModal(false);
        setNewListName('');
    };

    const handleAddList = () => {
        if (newListName.trim() === '') {
            alert('Please enter a list name.');
            return;
        }

        if (lists.length >= maxLists) {
            alert(`You can only create up to ${maxLists} lists.`);
            return;
        }

        const newList = {
            id: lists.length + 1,
            title: newListName.slice(0, 30),
            items: []
        };

        setLists([...lists, newList]);
        setSelectedList(newList);
        setNewListName('');
        setShowAddListModal(false);
    };

    const handleListSelect = (list) => {
        setSelectedList(list);
        setActiveIndex(0); // Reset active index when selecting a new list
    };

    const renderSlide = (startIndex, endIndex) => {
        return (
            <Carousel.Item key={startIndex}>
                <div className="d-flex flex-wrap">
                    {selectedList.items.slice(startIndex, endIndex).map(item => (
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
        if (!selectedList) {
            return null;
        }

        const { items } = selectedList;

        if (!items || items.length === 0) {
            return (
                <div className="empty-message mx-auto">
                    <strong>No Items in this List</strong>
                </div>
            );
        }

        const slides = [];
        let startIndex = 0;
        while (startIndex < items.length) {
            const endIndex = startIndex + 4;
            slides.push(renderSlide(startIndex, endIndex));
            startIndex = endIndex;
        }
        return slides;
    };

    const renderContent = () => {
        if (!selectedList || selectedList.items.length === 0) {
            return (
                <div className="empty-message mx-auto">
                    <strong>{!selectedList ? 'Select a List' : 'No Items in this List'}</strong>
                </div>
            );
        }

        const { items } = selectedList;
        const showIndicators = items.length > 4;
        const showControls = items.length > 4;

        return (
            <Carousel
                interval={null} // Set interval to null to disable automatic sliding
                indicators={showIndicators}
                controls={showControls}
                activeIndex={activeIndex}
                onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            >
                {renderSlides()}
            </Carousel>
        );
    };

    const handlePrevList = () => {
        const currentIndex = lists.findIndex(list => list.id === selectedList.id);
        const prevIndex = (currentIndex - 1 + lists.length) % lists.length;
        setSelectedList(lists[prevIndex]);
        setActiveIndex(0); // Reset active index when navigating to the previous list
    };

    const handleNextList = () => {
        const currentIndex = lists.findIndex(list => list.id === selectedList.id);
        const nextIndex = (currentIndex + 1) % lists.length;
        setSelectedList(lists[nextIndex]);
        setActiveIndex(0); // Reset active index when navigating to the next list
    };

    return (
        <div className="favorites-container">
            <div className="favorites-tab bg-secondary text-white">
                <span className="arrow" onClick={handlePrevList}>&lt;</span>
                <Dropdown className="mx-2">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {selectedList ? selectedList.title : 'Select List'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {lists.map(list => (
                            <Dropdown.Item key={list.id} onClick={() => handleListSelect(list)}>{list.title}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <span className="arrow" onClick={handleNextList}>&gt;</span>
            </div>
            <div className="cards-wrapper bg-light-grey">
                {renderContent()}
            </div>
            <div className="add-list-button">
                <button className="btn btn-primary rounded-pill" onClick={handleAddListClick}>Add List +</button>
            </div>
            <Modal show={showDeleteModal} onHide={closeModal} centered>
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
            <Modal show={showAddListModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newListName">
                        <Form.Label>List Name (Max 30 characters)</Form.Label>
                        <Form.Control
                            type="text"
                            maxLength={30}
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                    </Form.Group>
                    <p>You have {maxLists - lists.length} list(s) left.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddList}>
                        Add List
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Favorites;
