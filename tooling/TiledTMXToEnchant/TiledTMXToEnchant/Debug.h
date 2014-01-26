//Undefine DEBUG
#ifdef DEBUG
#undef DEBUG
#endif
//Define DEBUG
#define DEBUG 0x01
//MACRO for streaming DEBUG
#if defined DEBUG
#if (DEBUG == 0x01)
#define DEBUG_MSG(x) (x != NULL ? std::cout << (x) << std::endl : std::cout << "NULL MSG" << endl)
#else
#define DEBUG_MSG(x)
#endif
#else
#define DEBUG_MSG(x)
#endif