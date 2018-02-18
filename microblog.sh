#!/bin/bash  

startme() {
    echo "Starting microblog.."
	nohup node cluster.js > /dev/null &
	echo $! > microblog.pid
	echo "Started."
}

stopme() {
    echo "Stoping microblog.."
	pid = `cat microblog.pid`
	kill $pid
	echo "Stoped."
}

case "$1" in 
    start)   startme ;;
    stop)    stopme ;;
    restart) stopme; startme ;;
    *) echo "usage: $0 start|stop|restart" >&2
       exit 1
       ;;
esac

exit 0