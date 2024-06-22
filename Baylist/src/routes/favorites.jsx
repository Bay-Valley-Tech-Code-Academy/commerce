import './favorites.scss';
import image from '../assets/duck-product.jpg';
import { Carousel, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Favorites = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0); // State to track the active index of the carousel
    const [lists, setLists] = useState([
        {
            id: 1,
            title: 'Favorites',
            items: [
                { id: 1, title: 'Item 1 Title', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 },
                { id: 2, title: 'Item 2 Title', description: 'Item 2 description text goes here.', price: '$24.99', rating: 3 },
                { id: 3, title: 'Item 3 Title', description: 'Item 3 description text goes here.', price: '$19.99', rating: 2 },
                { id: 4, title: 'Item 4 Title', description: 'Item 4 description text goes here.', price: '$14.99', rating: 1 },
                { id: 5, title: 'Item 5 Title', description: 'Item 5 description text goes here.', price: '$39.99', rating: 5 },
                { id: 6, title: 'Item 6 Title', description: 'Item 6 description text goes here.', price: '$49.99', rating: 4 },
                { id: 7, title: 'Item 7 Title', description: 'Item 7 description text goes here.', price: '$59.99', rating: 3 },
                { id: 8, title: 'Item 8 Title', description: 'Item 8 description text goes here.', price: '$69.99', rating: 2 }// Add other items as needed
            ]
        },
        {
            id: 2,
            title: 'lmao dank memes',
            items: [{ id: 1, title: 'Duck', description: 'Item 1 description text goes here.', price: '$29.99', rating: 4 },
                { id: 2, title: 'DuckDuckDuckDuckDuck', description: 'stuff to add because I want to overflow the content so I will overflow it right now beyond the text boundaries okay??????', price: '$24.99', rating: 5 },
                { id: 3, title: 'GooseGooseGooseGoose', description: 'GooseGooseGooseGooseGooseGooseGoose', price: '$19.99', rating: 0 }]
        }
    ]);
    const [showAddListModal, setShowAddListModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState(null); // State to track the currently selected list
    const maxLists = 5; // Maximum number of lists per user

    useEffect(() => {
        // Initialize selectedList with the first list upon component mount
        if (lists.length > 0 && selectedList === null) {
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
    };

    const closeModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    // Function to handle the add list button click
    const handleAddListClick = () => {
        setShowAddListModal(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowAddListModal(false);
        setNewListName(''); // Reset the input field
    };

    // Function to handle adding a new list
    const handleAddList = () => {
        if (newListName.trim() === '') {
            alert('Please enter a list name.'); // Basic validation
            return;
        }

        if (lists.length >= maxLists) {
            alert(`You can only create up to ${maxLists} lists.`); // Limit reached
            return;
        }

        const newList = {
            id: lists.length + 1, // Generate a unique ID (you may need a more robust approach for real applications)
            title: newListName.slice(0, 30), // Limit to 30 characters
            items: [] // Initially empty items array
        };

        // Update the lists state with the new list
        setLists([...lists, newList]);
        setSelectedList(newList); // Set the newly added list as selected
        setNewListName('');
        setShowAddListModal(false);
    };

    const handleListSelect = (list) => {
        setSelectedList(list);
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
        const slides = [];
        let startIndex = 0;
        while (startIndex < selectedList.items.length) {
            const endIndex = startIndex + 4;
            slides.push(renderSlide(startIndex, endIndex));
            startIndex = endIndex;
        }
        return slides;
    };

    const renderContent = () => {
        if (selectedList && selectedList.items.length > 0) {
            const showIndicators = selectedList.items.length > 4; // Determine whether to show indicators based on number of items
            const showControls = selectedList.items.length > 4; // Determine whether to show controls based on number of items

            return (
                <Carousel
                    indicators={showIndicators}
                    controls={showControls}
                    activeIndex={activeIndex} // Make sure activeIndex is defined and set appropriately
                    onSelect={(selectedIndex) => setActiveIndex(selectedIndex)} // Set activeIndex when a slide is selected
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
            {lists.length > 1 && (
                <Dropdown className="mb-2 mt-2">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {selectedList ? selectedList.title : 'Select List'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {lists.map(list => (
                            <Dropdown.Item key={list.id} onClick={() => handleListSelect(list)}>{list.title}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}
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
            {/* Modal for adding a new list */}
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
